module.exports = {
  schema: {
    type: "string",
    minLength: 3,
    maxLength: 64,
    pattern: "^[A-Za-z0-9_\\-.\\\\]+$"
  },
  examples: {
    default: {
      value: '5f003f81d7075d564ec03066'
    }
  }
}
