module.exports = (config) => ({
  type: "custom",
  max: 1048576,
  check(value, schema) {
    let len = JSON.stringify(value).length;
    if(len > schema.max) {
      return [{ type: "max", expected: schema.max, actual: len }]
    }
    return true;
  },
  ...config
})
