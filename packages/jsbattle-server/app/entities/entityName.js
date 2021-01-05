module.exports = {
  schema: {
    type: "string",
    minLength: 3,
    // during user registration ext username is trim to that value
    maxLength: 32,
    pattern: '^[A-Za-z0-9_-]+$'
  },
  examples: {
    default: {
      value: 'bravo'
    }
  }
}
