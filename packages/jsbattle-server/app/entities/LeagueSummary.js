module.exports = {
  schema: {
    type: "object",
    properties: {
      submission: {
        $ref: '#/components/schemas/LeagueSubmission'
      },
      ranktable: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/League'
        }
      },
      history: {
        $ref: '#/components/schemas/LeagueHistory'
      }
    }
  },
  examples: {
    default: {
      value: {
        submission: {
          $ref: '#/components/examples/LeagueSubmission/value'
        },
        ranktable: [
          {
            $ref: '#/components/examples/League/value'
          }
        ],
        history: [
          {
            $ref: '#/components/examples/LeagueHistory/value/0'
          }
        ]
      }
    },
    empty: {
      value: {
        submission: {},
        ranktable: [
          {
            $ref: '#/components/examples/League/value'
          }
        ],
        history: [
          {
            $ref: '#/components/examples/LeagueHistory/value/0'
          }
        ]
      }
    }
  }
}
