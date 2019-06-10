const CopyPlugin = require('copy-webpack-plugin');
const ChromeExtensionReloader  = require('webpack-chrome-extension-reloader');
const path = require('path');
const webpack = require('webpack');
const packageJson = require('./package.json');

function transformManifest(content) {
  // remove comments and interpolate string from packageJson
  return content
    .toString()
    .replace(/\/\*[^]+\*\//gm, '') // multiline comment removal
    .replace(/{%\s?(.+?)\s?%}/gm, (fullMatch, match) => packageJson[match]);;
}

module.exports = {
  entry: {
    foreground: './app/foreground/index.tsx',
    background: './app/background/index.ts',
    content: './app/contentScript/index.ts',
  },
  devtool: process.env.NODE_ENV === 'production' ? false : 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ],
  },
  plugins: [
    new CopyPlugin([
      { from: 'app/icons/', to: 'icons/' },
      { from: 'app/foreground/index.html', to: 'foreground.html' },
      { from: 'app/manifest.jsonc', to: 'manifest.json', transform: transformManifest },
    ]),
    new ChromeExtensionReloader({
      entries: {
        background: 'background',
        contentScript: 'content', // Use the entry names, not the file name or the path
      }
    }),
    new webpack.EnvironmentPlugin({ // expose NODE_ENV from webpack to the build
      NODE_ENV: process.env.NODE_ENV,
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      react: "preact-compat",
      "react-dom": "preact-compat",
    }
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  performance: {
    assetFilter: assetFilename => !/(\.map$)|(^(foreground\.|favicon\.))/.test(assetFilename),
  },
};
