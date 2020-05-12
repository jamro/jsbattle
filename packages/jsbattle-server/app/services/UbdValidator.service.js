const Ajv = require('ajv');
const JsBattleSchema = require('jsbattle-engine/schema');
const Service = require("moleculer").Service;
const { ValidationError } = require("moleculer").Errors;

class UbdValidator extends Service {

  constructor(broker) {
    super(broker);
    this.parseServiceSchema({
      name: "ubdValidator",
      actions: {
        validate: this.validate
      }
    });
    this.schemaV1 = JsBattleSchema.getVersion(1);
    this.schemaV2 = JsBattleSchema.getVersion(2);
    this.schemaV3 = JsBattleSchema.getVersion(3);
  }

  validate(ctx) {
    let ubd = ctx.params.ubd
    if(!ubd) {
      throw new ValidationError('ubd parameter is required', 400);
    }

    if(typeof ubd == 'object') {
      ubd = JSON.stringify(ubd);
    }

    let ubdJson;
    try {
      ubdJson = JSON.parse(ubd);
    } catch(err) {
      return {valid: false, error: "Provided UBD is not valid JSON format"};
    }

    let version = Number(ubdJson.version);
    if(isNaN(version)) {
      version = 0;
    }

    // validate version number
    let schema;
    switch (version) {
      case 1:
        schema = this.schemaV1;
        break;
      case 2:
        schema = this.schemaV2;
        break;
      case 3:
        schema = this.schemaV3;
        break;
      default:
        return {valid: false, error: `UBD version ${version} is not supported`};
    }

    // validate Schema
    var ajv = new Ajv();
    var validate = ajv.compile(schema);
    var valid = validate(ubdJson);
    if (!valid) {
      let msg = validate.errors.reduce((log, err) => {
        log.push(err.dataPath + " " + err.message);
        return log;
      }, []);
      return {valid: false, error: msg.join("; ")};
    }

    return {valid: true};
  }

}

module.exports = UbdValidator;
