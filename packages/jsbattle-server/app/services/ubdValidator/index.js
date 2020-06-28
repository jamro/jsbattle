const Service = require("moleculer").Service;
const validators = require("../../validators");
const validate = require("./actions/validate.js");
const JsBattleSchema = require('jsbattle-engine/schema');

class UbdValidator extends Service {

  constructor(broker) {
    super(broker);
    this.parseServiceSchema({
      name: "ubdValidator",
      actions: {
        validate: {
          params: {
            ubd: validators.any()
          },
          handler: validate.bind(this)
        }
      }
    });
    this.schemaV1 = JsBattleSchema.getVersion(1);
    this.schemaV2 = JsBattleSchema.getVersion(2);
    this.schemaV3 = JsBattleSchema.getVersion(3);
    this.schemaV4 = JsBattleSchema.getVersion(4);
  }

}

module.exports = UbdValidator;
