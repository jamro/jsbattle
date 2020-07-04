module.exports = {
  schema: {
    type: "object",
    required: [
      'challengeId',
      'userId',
      'code',
      'modifiedAt',
      'completed'
    ],
    properties: {
      id: {
        $ref: '#/components/schemas/entityId'
      },
      challengeId: {
        $ref: '#/components/schemas/entityId'
      },
      userId: {
        $ref: '#/components/schemas/entityId'
      },
      code: {
        $ref: '#/components/schemas/code'
      },
      modifiedAt: {
        type: "string",
        format: "date-time"
      },
      completed: {
        type: "boolean"
      }
    }
  },
  examples: {
    default: {
      value: {
        "id":"a2d7075d56b76c234ec03048",
        "userId":"07ec06a685d56ba2d787af44",
        "challengeId":"challenge-8UCUaNvC",
        "modifiedAt":"2020-07-05T18:36:02.048Z",
        "code":"console.log('hello world')",
        "completed":false
      }
    }
  }
}
