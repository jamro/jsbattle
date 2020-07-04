module.exports = {
  schema: {
    type: "string",
    minLength: 3,
    maxLength: 16,
    pattern: '^[A-Za-z0-9_-]+$'
  },
  examples: {
    default: {
      value: 'bravo'
    }
  }
}
