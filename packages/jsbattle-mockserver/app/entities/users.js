const randomstring = require("randomstring");

module.exports =  () => {
  let id = randomstring.generate(16);
  let userNumber = Math.round(1000000*Math.random());
  const user = {
    id: id,
    username: "anonymous_" + userNumber,
    displayName: "Anonymous " + userNumber,
    provider: "",
    extUserId: "",
    email: "",
    role: "user",
    createdAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString()
  };
  return user;
};
