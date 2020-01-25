const Service = require("moleculer").Service;
const DbService = require("moleculer-db");
const path = require("path");
const { ValidationError } = require("moleculer").Errors;
const MemoryAdapter = DbService.MemoryAdapter
const _ = require('lodash');

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
        idField: 'id',
        fields: [
          "id",
          "createdAt",
          "ubd"
        ]
      },
      entityValidator: {
        ubd: "string",
        createdAt: "date"
      },
      dependencies: ['ubdValidator'],
      actions: {
        create: {
          params: {
            ubd: { type: "string", min: 2 }
          },
          handler: this.create
        }
      },
      hooks: {
        before: {
          publish: [
            function addDefaults(ctx) {
              ctx.params.createdAt = new Date();
              ctx.params = _.omit(ctx.params, ['id']);
              return ctx;
            }
          ],
          create: [
            function addDefaults(ctx) {
              ctx.params.createdAt = new Date();
              ctx.params = _.omit(ctx.params, ['id']);
              return ctx;
            }
          ],
          update: [
            function omitReadOnly(ctx) {
              ctx.params = _.omit(ctx.params, [
                'ubd',
                'createdAt',
                'id'
              ]);
              return ctx;
            }
          ]
        }
      }
    });
  }

  async create(ctx) {
    let ubd = ctx.params.ubd;

    let validation = await ctx.call('ubdValidator.validate', {ubd});
    if(!validation.valid) {
      throw new ValidationError('ubd parameter is invalid. ' + validation.error, 400);
    }
    this.logger.info(`Publishing UBD`);
    let response = await this._create(ctx, ctx.params);

    return response
  }

}

module.exports = BattleStoreService;
