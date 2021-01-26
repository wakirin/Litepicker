const multiconfig = require('./webpack.common.js');

multiconfig.forEach(config => {
  config.mode = 'development';
  config.devtool = 'inline-source-map';
});

module.exports = multiconfig;
