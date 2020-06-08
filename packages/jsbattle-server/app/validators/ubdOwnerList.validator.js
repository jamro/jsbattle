const entityId = require('./entityId.validator.js');
module.exports = (config) => ({
  type: "array",
  max: 10,
  items: entityId(),
  ...config
})
