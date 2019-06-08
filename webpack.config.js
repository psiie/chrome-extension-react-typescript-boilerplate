// const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ChromeExtensionReloader  = require('webpack-chrome-extension-reloader');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    foreground: './foreground/index.tsx',
    background: './background/index.ts',
    content: './contentScript/index.ts',
  },
  devtool: 'inline-source-map',
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
      { from: 'manifest.json', to: 'manifest.json' },
      { from: 'icons/', to: 'icons/' },
      { from: 'foreground/index.html', to: 'foreground.html' },
    ]),
    new ChromeExtensionReloader({
      port: 9090, // Which port use to create the server
      reloadPage: true, // Force the reload of the page also
      entries: { // The entries used for the content/background scripts
        contentScript: 'content', // Use the entry names, not the file name or the path
        background: 'background', // *REQUIRED
      }
    }),
    // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks; Terser will automatically
    // drop any unreachable code.
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
    }),

    // new BrowserSyncPlugin({
    //   host: 'localhost',
    //   port: 3000,
    //   server: { baseDir: ['build'] }
    // }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js']
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'build'),
  }
};
