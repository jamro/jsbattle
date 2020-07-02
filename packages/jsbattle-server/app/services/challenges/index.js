const DbService = require("moleculer-db");
const getDbAdapterConfig = require("../../lib/getDbAdapterConfig.js");
const validators = require("../../validators");

module.exports = (config) => {
  let adapterConfig = getDbAdapterConfig(config.data, 'challenge')

  return {
    ...adapterConfig,
    name: "challenges",
    mixins: [DbService],
    settings: {
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
