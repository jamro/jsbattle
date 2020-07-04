module.exports = {
  schema: {
    type: "object",
    required: [
      'username',
      'provider',
      'extUserId',
      'role',
      'createdAt',
      'lastLoginAt'
    ],
    properties: {
      id: {
        $ref: '#/components/schemas/entityId'
      },
      username: {
        $ref: '#/components/schemas/entityName'
      },
      displayName: {
        type: "string",
        minLength: 3,
        maxLength: 32,
        pattern: '^[A-Za-z0-9\\- .]+$'
      },
      provider: {
        $ref: '#/components/schemas/entityName'
      },
      extUserId: {
        type: "string",
        minLength: 1,
        maxLength: 1024
      },
      email: {
        $ref: '#/components/schemas/email'
      },
      registered: {
        type: "boolean"
      },
      role: {
        $ref: '#/components/schemas/entityName'
      },
      createdAt: {
        type: "string",
        format: "date-time"
      },
      lastLoginAt: {
        type: "string",
        format: "date-time"
      }
    }
  },
  examples: {
    default: {
      value: {
        id: '81d7075d564e3e403fc07621',
        username: 'johnny',
        displayName: 'Johnny Bravo',
        provider: 'google',
        extUserId: 'johny.bravo',
        email: 'johny.bravo@example.com',
        registered: true,
        role: 'user',
        createdAt: '2020-07-04T06:36:02.048Z',
        lastLoginAt: '2020-07-04T05:41:19.932Z'
      }
    }
  }
}
