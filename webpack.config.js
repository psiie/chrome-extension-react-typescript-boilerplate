const CopyPlugin = require('copy-webpack-plugin');
const ChromeExtensionReloader  = require('webpack-chrome-extension-reloader');
const path = require('path');
const webpack = require('webpack');
const packageJson = require('./package.json');

// remove comments and interpolate string from packageJson
function transformManifest(content) {
  return content
    .toString()
    .replace(/\/\*[^]+\*\//gm, '') // multiline comment removal
    .replace(/{%\s?(.+?)\s?%}/gm, (fullMatch, match) => packageJson[match]);;
}

const config = {
  entry: {
    foreground: './src/foreground/index.tsx',
    background: './src/background/index.ts',
    content: './src/contentScript/index.ts',
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
      { from: 'src/icons/', to: 'icons/' },
      { from: 'src/foreground/index.html', to: 'foreground.html' },
      { from: 'src/manifest.jsonc', to: 'manifest.json', transform: transformManifest },
    ]),
    new webpack.EnvironmentPlugin({ // expose NODE_ENV from webpack to the build
      NODE_ENV: process.env.NODE_ENV,
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      src: path.resolve(__dirname, 'src'),
      utils: path.resolve(__dirname, 'src/foreground/utils'),
      // react: "preact-compat",
      // "react-dom": "preact-compat",
    },
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  performance: {
    assetFilter: assetFilename => !/(\.map$)|(^(foreground\.|favicon\.))/.test(assetFilename),
  },
};

if (process.env.NODE_ENV !== 'production') {
  config.plugins.push(
    new ChromeExtensionReloader({
      entries: {
        background: 'background',
        contentScript: 'content', // Use the entry names, not the file name or the path
      }
    }),
  );
}

module.exports = config;
