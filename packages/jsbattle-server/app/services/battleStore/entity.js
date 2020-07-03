const validators = require("../../validators");

module.exports = {
  entityName: 'Battle',
  idField: 'id',
  fields: [
    "id",
    "createdAt",
    "expiresAt",
    "ubd",
    "description",
    "meta",
    "owner"
  ],
  entityValidator: {
    id: validators.entityId({optional: true}),
    ubd: validators.ubd(),
    description: validators.description({optional: true}),
    createdAt: validators.createDate(),
    expiresAt: validators.expireDate({optional: true}),
    expiresIn: validators.expireDuration({optional: true}),
    meta: validators.any({optional: true}),
    owner: validators.ubdOwnerList({optional: true}),
  },
}
