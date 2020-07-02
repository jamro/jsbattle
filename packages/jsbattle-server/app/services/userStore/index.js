const DbService = require("moleculer-db");
const getDbAdapterConfig = require("../../lib/getDbAdapterConfig.js");
const validators = require("../../validators");

module.exports = (config) => {

  let adapterConfig = getDbAdapterConfig(config.data, 'userStore');

  return {
    ...adapterConfig,
    name: "userStore",
    mixins: [DbService],
    settings: {
      $secureSettings: ['admins'],
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
        role: validators.entityName({optional: true}),
        createdAt: validators.createDate({optional: true}),
        lastLoginAt: validators.modifyDate({optional: true})
      },
      admins: config.auth.admins
    },
    actions: {
      findOrCreate: require("./actions/findOrCreate.js"),
      register: require("./actions/register.js")
    },
    hooks: {
      before: {
        create: [require("./hooks/create.js")],
        update: [require("./hooks/update.js")]
      }
    }
  };
};
