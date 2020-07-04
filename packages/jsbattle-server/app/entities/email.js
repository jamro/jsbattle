module.exports = {
  schema: {
    type: "string",
    maxLength: 256,
    pattern: '^([\\w-]+@([\\w-]+\\.)+[\\w-]+)|$',
  },
  example: {
    value: 'johny.bravo@example.com'
  }
}
