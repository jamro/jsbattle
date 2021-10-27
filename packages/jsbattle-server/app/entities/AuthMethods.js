module.exports = {
  schema: {
    type: "object",
    additionalProperties: {
      type: "object",
      properties: {
        name: {
          type: "string"
        },
        url: {
          type: "string",
          format: "uri"
        }
      }
    }
  },
  examples: {
    default: {
      value: {
        "github": {
          "name": "GitHub",
          "url": "http://localhost:9000/auth/github"
        },
        "google": {
          "name": "Google",
          "url": "http://localhost:9000/auth/google"
        }
      }
    }
  }
}
