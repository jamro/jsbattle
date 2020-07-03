const validators = require("../../validators");

module.exports = {
  entityName: 'Script',
  idField: 'id',
  fields: [
    "id",
    "ownerId",
    "ownerName",
    "scriptName",
    "namespace",
    "code",
    "createdAt",
    "modifiedAt",
    "hash",
  ],
  entityValidator: {
    ownerId: validators.entityId(),
    ownerName: validators.entityName(),
    scriptName: validators.entityName(),
    code: validators.code(),
    namespace: validators.entityName(),
    createdAt: validators.createDate(),
    modifiedAt: validators.modifyDate(),
    hash: validators.hash()
  }
}
