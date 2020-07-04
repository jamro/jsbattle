module.exports = {
  schema: {
    type: "object",
    required: [
      'createdAt',
      'ubd'
    ],
    properties: {
      id: {
        $ref: '#/components/schemas/entityId'
      },
      createdAt: {
        type: "string",
        format: "date-time"
      },
      expiresAt: {
        type: "string",
        format: "date-time"
      },
      ubd: {
        $ref: '#/components/schemas/ubd'
      },
      description: {
        type: "string",
        maxLength: 1024
      },
      meta: {
        type: "object"
      },
      owner: {
        type: "object",
        items: {
          $ref: '#/components/schemas/entityId'
        }
      }
    }
  },
  example: {
    value: {
      "id":"5f002352d7075d564ec03048",
      "createdAt":"2020-07-04T06:36:02.048Z",
      "expiresAt":"2020-07-05T18:36:02.048Z",
      "ubd":"{\"foo\": \"bar\"}",
      "description":"jsbattle/sniper vs jsbattle/crawler",
      "meta":[
        {
           "id":"5ee5f5ab15fc3f3f278082c4",
           "name":"jsbattle/sniper",
           "winner":true
        },
        {
           "id":"5ee698c99feda049511a15ee",
           "name":"jsbattle/crawler",
           "winner":false
        }
      ],
      "owner":[
        "5ee5f5ab15fc3f3f278082c4",
        "5ee698c99feda049511a15ee"
      ]
    }
  }
}
