const Service = require("moleculer").Service;
const DbService = require("moleculer-db");
const { ValidationError } = require("moleculer").Errors;
const _ = require('lodash');
const getDbAdapterConfig = require("../lib/getDbAdapterConfig.js");

class BattleStoreService extends Service {

  constructor(broker) {
    super(broker);
    this.config = broker.serviceConfig.battleStore;
    let adapterConfig = getDbAdapterConfig(broker.serviceConfig.data, 'battleStore')
    this.parseServiceSchema({
      ...adapterConfig,
      name: "battleStore",
      mixins: [DbService],
      settings: {
        idField: 'id',
        fields: [
          "id",
          "createdAt",
          "expiresAt",
          "ubd"
        ]
      },
      entityValidator: {
        ubd: "string",
        createdAt: "date",
        expiresAt: "date",
        expiresIn: "number"
      },
      dependencies: ['ubdValidator'],
      actions: {
        create: {
          params: {
            ubd: { type: "string", min: 2 }
          },
          handler: this.create
        },
        cleanup: this.cleanup
      },
      hooks: {
        before: {
          create: [
            function addDefaults(ctx) {
              let defaultExpires;
              if(ctx.params.expiresIn === undefined) {
                defaultExpires = new Date(new Date().getTime() + this.config.defaultExpireTime);
              } else {
                defaultExpires = new Date(new Date().getTime() + ctx.params.expiresIn);
              }
              ctx.params.createdAt = new Date();
              ctx.params.expiresAt = ctx.params.expiresAt || defaultExpires;
              ctx.params = _.omit(ctx.params, ['id']);
              return ctx;
            }
          ],
          update: [
            function omitReadOnly(ctx) {
              ctx.params = _.omit(ctx.params, [
                'ubd',
                'createdAt'
              ]);
              return ctx;
            }
          ]
        }
      },
      started: () => {
        this.logger.info('Starting clean up loop at ' + this.config.cleanupInterval + 'ms')
        this.loop = setInterval(async () => {
          try {
            await broker.call('battleStore.cleanup', {})
          } catch(err) {
            this.logger.warn(err)
          }
        }, this.config.cleanupInterval)
      },
      stopped: () => {
        clearInterval(this.loop)
      },
    });
  }

  async cleanup(ctx) {
    let oldItems = await this._find(ctx, {
      query: {
        expiresAt: {
          $lt: new Date()
        }
      }
    });
    oldItems = oldItems.map((r) => r.id)
    let removals = oldItems.map((id) => this._remove(ctx, { id }));
    await Promise.all(removals);
  }

  async create(ctx) {
    let ubd = ctx.params.ubd;

    let validation = await ctx.call('ubdValidator.validate', {ubd});
    if(!validation.valid) {
      throw new ValidationError('ubd parameter is invalid. ' + validation.error, 400);
    }
    this.logger.debug(`Storing UBD since ${ctx.params.createdAt.toISOString()} till ${ctx.params.expiresAt.toISOString()}`);

    if(ctx.params.expiresAt.getTime() < ctx.params.createdAt.getTime()) {
      this.logger.warn('Expire date is in the past. Skipping UBD creation. Nothing will happen.')
      return {};
    }

    this.logger.info(`Publishing UBD`);
    let response = await this._create(ctx, ctx.params);

    return response
  }

}

module.exports = BattleStoreService;
