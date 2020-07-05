module.exports = {
  schema: {
    allOf: [
      {
        $ref: '#/components/schemas/League'
      },
      {
        type: "object",
        properties: {
          latest: {
            type: "boolean"
          },
          history: {
            $ref: '#/components/schemas/LeagueHistory'
          }
        }
      }
    ]
  },
  examples: {
    default: {
      value: {
        allOf: [
          {
            $ref: '#/components/examples/League/value'
          },
          {
            "latest": true,
            "history": [
              {
                $ref: '#/components/examples/LeagueHistory/value/0'
              }
            ]
          }
        ]
      }
    }
  }
}
