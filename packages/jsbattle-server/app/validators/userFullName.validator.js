module.exports = (config) => ({
  type: "string",
  min: 3,
  max: 16,
  pattern: /^[A-Za-z0-9\- .]+$/,
  ...config
});
