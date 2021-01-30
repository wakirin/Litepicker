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
            loader: 'style-loader',
            options: {
              insert: function insertAtTop(element) {
                var parent = document.querySelector('head');
                // eslint-disable-next-line no-underscore-dangle
                var lastInsertedElement = window._lastElementInsertedByStyleLoader;

                if (!window.disableLitepickerStyles) {
                  if (!lastInsertedElement) {
                    parent.insertBefore(element, parent.firstChild);
                  } else if (lastInsertedElement.nextSibling) {
                    parent.insertBefore(element, lastInsertedElement.nextSibling);
                  } else {
                    parent.appendChild(element);
                  }

                  // eslint-disable-next-line no-underscore-dangle
                  window._lastElementInsertedByStyleLoader = element;
                }
              },
            },
          },
          {
            loader: 'css-loader', // Translates CSS into CommonJS
          },
        ]
      },
      {
        test: /plugins[/\\].+\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },

  plugins: [
    new webpack.BannerPlugin(banner),
  ]
};