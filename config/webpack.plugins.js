const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    'plugins/keyboardnav/index.js': path.join(__dirname, '../src/plugins/keyboardnav/index.js'),
    'plugins/mobilefriendly/index.js': path.join(__dirname, '../src/plugins/mobilefriendly/index.js'),
    'plugins/ranges/index.js': path.join(__dirname, '../src/plugins/ranges/index.js'),
  },
  output: {
    path: path.join(__dirname, '../dist/js'),
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
  }
};