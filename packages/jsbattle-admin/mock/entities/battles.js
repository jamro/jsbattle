const randomstring = require("randomstring");

module.exports = () => {
  let id = randomstring.generate(16);
  const battle = {
    id: id,
    battleId: id,
    ubd: "{\"version\":3,\"rngSeed\":0.8186448997231914,\"teamMode\":false,\"timeLimit\":0,\"aiList\":[{\"name\":\"jamro\",\"team\":\"2m9po29ef\",\"code\":null,\"initData\":null,\"useSandbox\":true,\"executionLimit\":100},{\"name\":\"kamikaze\",\"team\":\"97y2ckbx\",\"code\":null,\"initData\":null,\"useSandbox\":true,\"executionLimit\":100}]}",
    createdAt: new Date().toISOString()
  }
  return battle;
};
