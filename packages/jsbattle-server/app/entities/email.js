module.exports = {
  schema: {
    type: "string",
    maxLength: 256,
    pattern: '^([\\w\\.-]+@([\\w-]+\\.)+[\\w-]+)|$',
  },
  examples: {
    default: {
      value: 'johny.bravo@example.com'
    }
  }
}
