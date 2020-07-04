module.exports = {
  schema: {
    type: "object",
    required: [
      'joinedAt',
      'ownerId',
      'ownerName',
      'scriptId',
      'scriptName',
      'fights_total',
      'fights_win',
      'fights_lose',
      'fights_error',
      'score',
      'code'
    ],
    properties: {
      id: {
        $ref: '#/components/schemas/entityId'
      },
      joinedAt: {
        type: "string",
        format: "date-time"
      },
      ownerId: {
        $ref: '#/components/schemas/entityId'
      },
      ownerName: {
        $ref: '#/components/schemas/entityName'
      },
      scriptId: {
        $ref: '#/components/schemas/entityId'
      },
      scriptName: {
        $ref: '#/components/schemas/entityName'
      },
      fights_total: {
        type: 'number',
        minimum: 0
      },
      fights_win: {
        type: 'number',
        minimum: 0
      },
      fights_lose: {
        type: 'number',
        minimum: 0
      },
      fights_error: {
        type: 'number',
        minimum: 0
      },
      score: {
        type: 'number',
        minimum: 0
      },
      code: {
        $ref: '#/components/schemas/code'
      },
      hash: {
        $ref: '#/components/schemas/hash'
      }
    }
  },
  example: {
    value: {
      "id":"a2d7075d56b76c234ec03048",
      "jonedAt":"2020-07-05T18:36:02.048Z",
      "ownerId":"07ec06a685d56ba2d787af44",
      "ownerName":"johnny",
      "scriptId":"587ab58706a685daf4407e1",
      "scriptName":"bravo",
      "fights_total": 109,
      "fights_win": 62,
      "fights_lose": 47,
      "fights_error": 0,
      "score": 5688,
      "code": 'console.log(\'hello world\')',
      "hash": '4D2B0403F1CC1B465C69814AA49AF1A86A9094FA',
    }
  }
}
