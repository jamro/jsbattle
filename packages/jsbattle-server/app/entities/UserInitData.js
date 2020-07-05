module.exports = {
  schema: {
    type: "object",
    properties: {
       username: {
          $ref: '#/components/schemas/entityName'
       },
       displayName:  {
           type: "string",
           minLength: 3,
           maxLength: 32,
           pattern: '^[A-Za-z0-9\\- .]+$'
       },
       challenges: {
          type: "array",
          items: {
             type: "object",
             properties: {
                challengeId:{
                   $ref: '#/components/schemas/entityId'
                },
                completed: {
                   type: "boolean"
                },
                code: {
                   $ref: '#/components/schemas/code'
                }
             }
          }
       },
       scripts: {
          type: "array",
          items: {
             type: "object",
             properties: {
                scriptName: {
                   $ref: '#/components/schemas/entityName'
                },
                code: {
                   $ref: '#/components/schemas/code'
                }
             }
          }
       }
    }
  },
  examples: {
    default: {
      value: {
        username: 'johnny',
        displayName: 'Johnny Bravo',
        challenges: [
          {
            challengeId: 'challenge-8UCUaNvC',
            code: 'console.log("hello world")',
            completed: false
          }
        ],
        scripts: [
          {
            scriptName: 'alpha',
            code: 'console.log("hello world from alpha")',
          }
        ]
      }
    }
  }
}
