module.exports = {
  schema: {
    type: "object"
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
