const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    'js/main.js': path.join(__dirname, '/src/index.ts'),
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.ts?$/,
        loader: 'ts-loader'
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'dts-css-modules-loader',
            options: {
              namedExport: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              modules: true, // this option must be enabled
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
          'sass-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  plugins: [],
}
