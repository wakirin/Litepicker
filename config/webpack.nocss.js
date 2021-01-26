const webpack = require('webpack');
const path = require('path');
const getPackageJson = require('./getPackageJson');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const createVariants = require('parallel-webpack').createVariants;

const {
  version,
  name,
  license,
} = getPackageJson('version', 'name', 'license');

const banner = `
Litepicker v${version} (https://github.com/wakirin/Litepicker)
Package: ${name} (https://www.npmjs.com/package/litepicker)
License: ${license} (https://github.com/wakirin/Litepicker/blob/master/LICENCE.md)
Copyright 2019-${new Date().getFullYear()} Rinat G.
    
Hash: [hash]
Generated on: ${Date.now()}
`;

const createConfig = (options) => {
  const fileName = !['var'].includes(options.target) ? `.${options.target}.js` : '.js';

  const outputConfig = {
    path: path.join(__dirname, '../dist/nocss'),
    filename: 'litepicker' + fileName,
    library: 'Litepicker',
    libraryTarget: options.target
  }

  if (options.target === 'var') {
    outputConfig.libraryExport = 'Litepicker';
  }

  if (options.target === 'umd') {
    outputConfig.umdNamedDefine = true;
  }

  return {
    entry: path.join(__dirname, '../src/index.ts'),
    output: outputConfig,
  }
}

const multiconfig = createVariants({
  target: ['var', 'commonjs2', 'umd', 'amd']
}, createConfig);

multiconfig.forEach(config => {
  config.mode = 'production';
  config.module = {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.ts?$/,
        loader: 'ts-loader',
      },
      {
        test: /\.scss$/,
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
          'sass-loader',
        ]
      },
    ]
  };

  config.resolve = {
    extensions: [".ts", ".tsx", ".js"]
  };

  config.plugins = [
    new webpack.BannerPlugin(banner),
    new MiniCssExtractPlugin({
      filename: "../css/style.css",
    }),
  ];
});

module.exports = multiconfig;
