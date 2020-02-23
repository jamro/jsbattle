const randomstring = require("randomstring");

module.exports = () => {
  let id = randomstring.generate(16);
  const script = {
    "_id": id,
    "id": id,
    "ownerId": "000",
    "ownerName": "mock",
    "scriptName": "mock_" + randomstring.generate(4),
    "namespace": "user",
    "code": "importScripts('lib/tank.js');\n\n// Don't know where to start?\n// Read Getting Started in \"Docs\" section \n\ntank.init(function(settings, info) {\n\t// initialize tank here\n  \n});\n\ntank.loop(function(state, control) {\n\t// write your tank logic here\n  \n});\n\n\n",
    "createdAt": new Date().toISOString(),
    "modifiedAt": new Date().toISOString()
  }
  return script;
};
