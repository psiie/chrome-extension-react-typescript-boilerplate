const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    foreground: './foreground/index.ts',
    background: './background/index.ts',
    inject: './inject/index.ts',
  },
  devtool: 'inline-source-map',
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    }],
  },
  plugins: [
    new CopyPlugin([
      { from: 'manifest.json', to: 'manifest.json' },
      { from: 'icons/', to: 'icons/' },
      { from: 'foreground/index.html', to: 'foreground.html' },
    ]),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: { baseDir: ['build'] }
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: '[name].bundle.js', // 'bundle.[hash:5].js',
    path: path.resolve(__dirname, 'build'),
  }
};
