const Ajv = require('ajv');
const { ValidationError } = require("moleculer").Errors;
const JsBattleSchema = require('jsbattle-engine/schema');
const schemaV1 = JsBattleSchema.getVersion(1);
const schemaV2 = JsBattleSchema.getVersion(2);
const schemaV3 = JsBattleSchema.getVersion(3);
const schemaV4 = JsBattleSchema.getVersion(4);

module.exports = function(ctx) {
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
  this.logger.debug(`Validating UBD, version: ${version}`);
  switch (version) {
    case 1:
      schema = schemaV1;
      break;
    case 2:
      schema = schemaV2;
      break;
    case 3:
      schema = schemaV3;
      break;
    case 4:
      schema = schemaV4;
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
    this.logger.debug('Invalid UBD: ' + msg.join("; "));
    return {valid: false, error: msg.join("; ")};
  }

  return {valid: true};
}
