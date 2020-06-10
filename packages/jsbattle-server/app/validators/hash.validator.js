module.exports = (config) => ({
  type: "string",
  min: 16,
  max: 128,
  pattern: /^[a-zA-Z0-9]+$/,
  ...config
})
