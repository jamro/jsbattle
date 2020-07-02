const DbService = require("moleculer-db");
const getDbAdapterConfig = require("../../lib/getDbAdapterConfig.js");
const validators = require("../../validators");

module.exports = (config) => {
  let adapterConfig = getDbAdapterConfig(config.data, 'battleStore')

  return {
    ...adapterConfig,
    name: "battleStore",
    mixins: [DbService],
    settings: {
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
      defaultExpireTime: config.battleStore.defaultExpireTime,
      cleanupInterval: config.battleStore.cleanupInterval
    },
    entityValidator: {
      id: validators.entityId({optional: true}),
      ubd: validators.ubd(),
      description: validators.description(),
      createdAt: validators.createDate(),
      expiresAt: validators.expireDate(),
      expiresIn: validators.expireDuration(),
      meta: validators.any(),
      owner: validators.ubdOwnerList(),
    },
    actions: {
      create: {
        params: {
          ubd: validators.ubd(),
          expiresAt: validators.expireDate({optional: true}),
          expiresIn: validators.expireDuration({optional: true}),
          description: validators.description({optional: true}),
          owner: validators.ubdOwnerList({optional: true}),
          meta: validators.any({optional: true})
        },
        handler: require('./actions/create.js')
      },
      cleanup: require('./actions/cleanup.js')
    },
    hooks: {
      before: {
        create: [require('./hooks/create.js')],
        update: [require('./hooks/update.js')]
      }
    },
    started: require('./events/onStart.js'),
    stopped: require('./events/onStop.js'),
  }
}
