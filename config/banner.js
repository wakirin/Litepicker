const getPackageJson = require('./getPackageJson');

const {
  version,
  name,
  license,
} = getPackageJson('version', 'name', 'license');

const banner = `
[file]
Litepicker v${version} (https://github.com/wakirin/Litepicker)
Package: ${name} (https://www.npmjs.com/package/litepicker)
License: ${license} (https://github.com/wakirin/Litepicker/blob/master/LICENCE.md)
Copyright 2019-${new Date().getFullYear()} Rinat G.
    
Hash: [hash]
`;

module.exports = banner;