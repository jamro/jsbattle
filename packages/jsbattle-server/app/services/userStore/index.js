const DbService = require("moleculer-db");
const getDbAdapterConfig = require("../../lib/getDbAdapterConfig.js");

module.exports = (config) => {

  let adapterConfig = getDbAdapterConfig(config.data, 'userStore');
  let entity = require('./entity.js');

  return {
    ...adapterConfig,
    name: "userStore",
    mixins: [DbService],
    settings: {
      $secureSettings: ['admins'],
      ...entity,
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
