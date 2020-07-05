module.exports = {
  schema: {
    type: "object",
    required: [
      'ownerId',
      'ownerName',
      'scriptName',
      'namespace',
      'code',
      'createdAt',
      'modifiedAt',
      'hash'
    ],
    properties: {
      id: {
        $ref: '#/components/schemas/entityId'
      },
      ownerId: {
        $ref: '#/components/schemas/entityId'
      },
      ownerName: {
        $ref: '#/components/schemas/entityName'
      },
      scriptName: {
        $ref: '#/components/schemas/entityName'
      },
      namespace: {
        $ref: '#/components/schemas/entityName'
      },
      code: {
        $ref: '#/components/schemas/code'
      },
      createdAt: {
        type: "string",
        format: "date-time"
      },
      modifiedAt: {
        type: "string",
        format: "date-time"
      },
      hash: {
        $ref: '#/components/schemas/hash'
      },
    }
  },
  examples: {
    default: {
      value: {
        id: '81d7075d564e3e403fc07621',
        ownerId: '5d564ec076351f082a81d707',
        ownerName: 'johnny',
        scriptName: 'bravo',
        namespace: 'user',
        code: 'console.log(\'hello world\')',
        createdAt: '2020-07-04T06:36:02.048Z',
        modifiedAt: '2020-07-04T06:39:42.184Z',
        hash: '4D2B0403F1CC1B465C69814AA49AF1A86A9094FA',
      }
    },
    update: {
      value: {
        scriptName: 'bravo',
        code: 'console.log(\'hello world\')'
      }
    },
    list: {
      value: [
        {
          id: '81d7075d564e3e403fc07621',
          ownerId: '5d564ec076351f082a81d707',
          ownerName: 'johnny',
          scriptName: 'bravo',
          namespace: 'user',
          code: 'console.log(\'hello world\')',
          createdAt: '2020-07-04T06:36:02.048Z',
          modifiedAt: '2020-07-04T06:39:42.184Z',
          hash: '4D2B0403F1CC1B465C69814AA49AF1A86A9094FA',
        },
        {
          id: '0703f62181de3e475d5c0764',
          ownerId: '5d564ec076351f082a81d707',
          ownerName: 'johnny',
          scriptName: 'predator',
          namespace: 'user',
          code: 'console.log(\'hello world 2\')',
          createdAt: '2020-07-05T11:32:12.001Z',
          modifiedAt: '2020-07-06T12:19:54.938Z',
          hash: 'F1A840696A93F1CC09812B01B4654AA49A4FA4DC',
        }
      ]
    }
  }
}
