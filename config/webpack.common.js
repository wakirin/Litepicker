const webpack = require('webpack');
const path = require('path');
const getPackageJson = require('./getPackageJson');
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
    path: path.join(__dirname, '../dist'),
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
            loader: 'dts-css-modules-loader',
            options: {
              namedExport: true
            }
          },
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
  ];
});

module.exports = multiconfig;
