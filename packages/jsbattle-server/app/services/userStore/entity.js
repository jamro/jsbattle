const validators = require("../../validators");

module.exports = {
  entityName: 'User',
  idField: 'id',
  fields: [
    "id",
    "username",
    "displayName",
    "provider",
    "extUserId",
    "email",
    "registered",
    "role",
    "createdAt",
    "lastLoginAt"
  ],
  entityValidator: {
    extUserId: {type: "string", min: 1, max: 1024},
    username: validators.entityName(),
    displayName: validators.userFullName({optional: true}),
    email: validators.email({optional: true}),
    registered: {type: "boolean", optional: true},
    provider: validators.entityName(),
    role: validators.entityName(),
    createdAt: validators.createDate(),
    lastLoginAt: validators.modifyDate()
  },
}
