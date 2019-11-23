const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  entry: {
    'style': path.join(__dirname, '/docs/scss/style.scss'),
  },
  output: {
    path: path.join(__dirname, 'docs'),
    filename: '[name]',
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /docs\/scss\/style\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false,
              sourceMap: false
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
  plugins: [
    new CopyWebpackPlugin([
      { from: 'dist/js/main.js', to: 'js/main.js' },
    ]),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    {
      apply(compiler) {
        compiler.hooks.shouldEmit.tap('Remove style from output', (compilation) => {
          delete compilation.assets['style'];  // Remove asset. Name of file depends of your entries and 
          return true;
        })
      }
    }
  ],
}
