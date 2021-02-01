const webpack = require('webpack');
const path = require('path');
const banner = require('./banner');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  entry: {
    'plugins/keyboardnav.js': path.join(__dirname, '../src/plugins/keyboardnav/index.js'),
    'plugins/mobilefriendly.js': path.join(__dirname, '../src/plugins/mobilefriendly/index.js'),
    'plugins/ranges.js': path.join(__dirname, '../src/plugins/ranges/index.js'),
    'plugins/multiselect.js': path.join(__dirname, '../src/plugins/multiselect/index.js'),
  },
  output: {
    path: path.join(__dirname, '../dist/nocss/'),
    filename: '[name]'
  },

  module: {
    rules: [
      {
        test: /plugins[/\\].+\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]',
              },
              localsConvention: 'camelCaseOnly'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: 'postcss.config.js'
              }
            }
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
    new MiniCssExtractPlugin({
      filename: "../css/[name].css",
    }),
  ]
};