module.exports = (config) => ({
  optional: true,
  type: "string",
  min: 3,
  max: 256,
  pattern: /^[\w-]+@([\w-]+\.)+[\w-]+$/,
  ...config
})
