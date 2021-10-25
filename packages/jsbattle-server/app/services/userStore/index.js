const ExtendedDbService = require("../../lib/ExtendedDbService.js");
const getDbAdapterConfig = require("../../lib/getDbAdapterConfig.js");
const getEntityConfig = require("../../lib/getEntityConfig.js");
const validators = require("../../validators");

module.exports = (config) => {

  let adapterConfig = getDbAdapterConfig(config.data, 'userStore');
  let entity = getEntityConfig('User');

  return {
    ...adapterConfig,
    name: "userStore",
    mixins: [ExtendedDbService],
    settings: {
      $secureSettings: ['admins'],
      ...entity,
      admins: config.auth.admins
    },
    actions: {
      findOrCreate: require("./actions/findOrCreate.js"),
      register: {
        params: {
          username: validators.entityName({optional: true}),
          displayName: validators.userFullName({optional: true}),
        },
        handler: require("./actions/register.js")
      }
    },
    hooks: {
      before: {
        create: [require("./hooks/create.js")],
        register: [require("./hooks/register.js")],
        update: [require("./hooks/update.js")]
      }
    }
  };
};
