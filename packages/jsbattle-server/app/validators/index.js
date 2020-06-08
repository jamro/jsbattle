const fs = require('fs');

module.exports = fs
  .readdirSync(__dirname)
  .filter((name) => name.endsWith('.validator.js'))
  .map((name) => name.replace(/\.validator\.js$/, ''))
  .reduce((result, val) => {
    result[val] = require('./' + val + ".validator.js");
    return result;
  }, {});
