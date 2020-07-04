module.exports = {
  schema: {
    type: "string",
    minLength: 16,
    maxLength: 128,
    pattern: '^[a-zA-Z0-9]+$'
  },
  examples: {
    deafult: {
      value: '9AF1A86A4DC1B465C69814AA49094FA2B0403F1C'
    }
  }
}
