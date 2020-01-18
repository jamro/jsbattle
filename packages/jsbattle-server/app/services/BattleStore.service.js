const Service = require("moleculer").Service;
const DbService = require("moleculer-db");
const path = require("path");
const { ValidationError } = require("moleculer").Errors;
const { MoleculerClientError } = require("moleculer").Errors;
const MemoryAdapter = DbService.MemoryAdapter

class BattleStoreService extends Service {

  constructor(broker) {
    super(broker);

    let dbAdapter;
    if(broker.serviceConfig.data && broker.serviceConfig.data.path) {
      dbAdapter = new MemoryAdapter({filename: path.join(broker.serviceConfig.data.path, 'battleStore.db')});
    } else {
      dbAdapter = new MemoryAdapter();
    }

    this.parseServiceSchema({
      name: "battleStore",
      mixins: [DbService],
      adapter: dbAdapter,
      settings: {
        idField: 'battleId',
        fields: [
          "battleId",
          "ubd"
        ],
        entityValidator: {
          ubd: "string"
        }
      },
      dependencies: ['ubdValidator'],
      actions: {
        getReplay: this.getReplay,
        publish: this.publish
      }
    });
  }

  async getReplay(ctx) {
    let battleId = ctx.params.battleId;
    if(!battleId) {
      throw new ValidationError('battleId parameter is required', 400);
    }
    this.logger.info(`Reading battle data for ${battleId}`)
    let response;
    try {
      response = await ctx.call('battleStore.get', {id: battleId});
    } catch (err) {
      if (err.__proto__.constructor.name === 'EntityNotFoundError') {
        throw new MoleculerClientError(`Battle not found`, 404);
      } else {
        throw err;
      }
    }

    let ubd = response.ubd;
    if(typeof ubd !== 'object') {
      ubd = JSON.parse(ubd);
    }

    return {
      battleId: response.battleId,
      ubd: ubd
    }
  }

  async publish(ctx) {
    let ubd = ctx.params.ubd;
    if(!ubd) {
      throw new ValidationError('ubd parameter is required', 400);
    }

    if(typeof ubd == 'object') {
      ubd = JSON.stringify(ubd);
    }

    let validation = await ctx.call('ubdValidator.validate', {ubd});
    if(!validation.valid) {
      throw new ValidationError('ubd parameter is invalid. ' + validation.error, 400);
    }
    this.logger.info(`Publishing UBD`)
    let response = await ctx.call('battleStore.create', {ubd: ubd});

    return response
  }

}

module.exports = BattleStoreService;
