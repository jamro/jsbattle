module.exports = (config) => ({
  type: "string",
  max: 256,
  pattern: config.optional ? /^([\w-]+@([\w-]+\.)+[\w-]+)|$/ : /^[\w-]+@([\w-]+\.)+[\w-]+$/,
  ...config
})
