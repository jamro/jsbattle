module.exports = {
  schema: {
    type: "array",
    items: {
      type: "object",
      properties: {
        id: {
          $ref: '#/components/schemas/entityId'
        },
        createdAt: {
          type: "string",
          format: "date-time"
        },
        players: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: {
                $ref: '#/components/schemas/entityId'
              },
              name: {
                $ref: '#/components/schemas/entityName'
              },
              winner: {
                type: "boolean"
              }
            }
          }
        }
      }
    }
  },
  examples: {
    default: {
      value: [
        {
          "id": "ztYTcUTDOE5g9doS",
          "createdAt": "2020-07-05T07:14:20.509Z",
          "players": [
            {
              "id": "pXgkeRXuPI3AxggE",
              "name": "jsbattle/chicken",
              "winner": true
            },
            {
              "id": "dLz6Nz8lLmmlvzUT",
              "name": "jsbattle/crawler",
              "winner": false
            }
          ]
        },
        {
          "id": "TSRqYpMO61okgWbJ",
          "createdAt": "2020-07-05T07:14:14.531Z",
          "players": [
            {
              "id": "c8P3GlLUD5IPKYi4",
              "name": "jsbattle/sniper",
              "winner": false
            },
            {
              "id": "JYoJCbKQWX6oxZC4",
              "name": "jsbattle/jamro",
              "winner": true
            }
          ]
        }
      ]
    }
  }
}
