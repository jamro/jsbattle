module.exports = (config) => ({
  type: "string",
  min: 3,
  max: 64,
  pattern: /^[A-Za-z0-9\-_.]+$/,
  ...config
})
