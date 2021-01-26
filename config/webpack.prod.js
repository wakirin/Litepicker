const multiconfig = require('./webpack.common.js');

multiconfig.forEach(config => {
  config.mode = 'production';
});

module.exports = multiconfig;
