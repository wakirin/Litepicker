const webpack = require('webpack');
const path = require('path');
const banner = require('./banner');

module.exports = {
  mode: 'production',
  entry: {
    'plugins/keyboardnav.js': path.join(__dirname, '../src/plugins/keyboardnav/index.js'),
    'plugins/mobilefriendly.js': path.join(__dirname, '../src/plugins/mobilefriendly/index.js'),
    'plugins/ranges.js': path.join(__dirname, '../src/plugins/ranges/index.js'),
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name]'
  },

  module: {
    rules: [
      {
        test: /plugins[/\\].+\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader', // Translates CSS into CommonJS
          },
        ]
      }
    ]
  },

  plugins: [
    new webpack.BannerPlugin(banner),
  ]
};