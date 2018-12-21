const Ajv = require('ajv');

module.exports = function battleStore( options ) {

  let schemaPath = options.schemaPath || __dirname + '/../../schema';

  const schema_v1 = require(schemaPath + '/ubd-schema-v1.json');
  const schema_v2 = require(schemaPath + '/ubd-schema-v2.json');

  this.add('role:ubdValidator,cmd:validate', validate);

  function validate(msg, respond ) {
    this.log.info({notice: `validation...`});
    if(!msg.ubd) {
      return respond(new Error('msg.ubd is required'));
    }

    if(typeof msg.ubd == 'object') {
      msg.ubd = JSON.stringify(msg.ubd);
    }

    let ubdJson;
    try {
      ubdJson = JSON.parse(msg.ubd);
    } catch(err) {
      return respond(null, {valid: false, error: "Provided UBD is not valid JSON format"});
    }

    let version = Number(ubdJson.version);
    if(isNaN(version)) {
      version = 0;
    }

    // validate version number
    let schema;
    switch (version) {
      case 1:
        schema = schema_v1;
        break;
      case 2:
        schema = schema_v2;
        break;
      default:
        return respond(null, {valid: false, error: `UBD version ${version} is not supported`});
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
      return respond(null, {valid: false, error: msg.join("; ")});
    }

    return respond(null, {valid: true});
  }

  return {
    name: "ubdValidator"
  };
};
