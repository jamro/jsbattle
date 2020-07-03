const validators = require("../../validators");

module.exports = {
  entityName: 'Challenge',
  idField: 'id',
  fields: [
    "id",
    "challengeId",
    "userId",
    "code",
    "completed",
    "modifiedAt"
  ],
  entityValidator: {
    id: validators.entityId({optional: true}),
    userId: validators.entityId(),
    challengeId: validators.entityId(),
    completed: { type: "boolean" },
    code: validators.code(),
    modifiedAt: validators.modifyDate()
  }
}
