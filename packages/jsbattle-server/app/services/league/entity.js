const validators = require("../../validators");

module.exports = {
  entityName: 'League',
  idField: 'id',
  fields: [
    "id",
    "joinedAt",
    "ownerId",
    "ownerName",
    "scriptId",
    "scriptName",
    "fights_total",
    "fights_win",
    "fights_lose",
    "fights_error",
    "score",
    "code",
    "hash"
  ],
  entityValidator: {
    id: validators.entityId({optional: true}),
    joinedAt: validators.createDate(),
    ownerId: validators.entityId(),
    ownerName: validators.entityName(),
    scriptId: validators.entityId(),
    scriptName: validators.entityName(),
    fights_total: {type: "number", min: 0},
    fights_win: {type: "number", min: 0},
    fights_lose: {type: "number", min: 0},
    fights_error: {type: "number", min: 0},
    score: {type: "number", min: 0},
    code: validators.code(),
    hash: validators.hash({optional: true})
  },
}
