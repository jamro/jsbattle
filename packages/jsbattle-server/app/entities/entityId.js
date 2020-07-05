module.exports = {
  schema: {
    type: "string",
    minLength: 3,
    maxLength: 64,
    pattern: "^[A-Za-z0-9_\\-.\\\\]+$"
  },
  examples: {
    default: {
      value: 'MRF6IRZb2CKYk8Ie'
    }
  }
}
