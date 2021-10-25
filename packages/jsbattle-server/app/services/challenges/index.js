const ExtendedDbService = require("../../lib/ExtendedDbService.js");
const getDbAdapterConfig = require("../../lib/getDbAdapterConfig.js");
const getEntityConfig = require("../../lib/getEntityConfig.js");
const validators = require("../../validators");

module.exports = (config) => {
  let adapterConfig = getDbAdapterConfig(config.data, 'challenge')
  let entity = getEntityConfig('Challenge');

  return {
    ...adapterConfig,
    name: "challenges",
    mixins: [ExtendedDbService],
    settings: {
      ...entity
    },
    actions: {
      listUserChallenges: require('./actions/listUserChallenges.js'),
      getUserChallenge: {
        params: {
          challengeId: validators.entityId()
        },
        handler: require('./actions/getUserChallenge.js')
      },
      updateUserChallenge: {
        params: {
          challengeId: validators.entityId(),
          completed: { type: "boolean", optional: true},
          code: validators.code({optional: true})
        },
        handler: require('./actions/updateUserChallenge.js')
      },
    },
    hooks: {
      before: {
        create: [require('./hooks/create.js')],
        update: [require('./hooks/update.js')]
      }
    }
  }
};
