module.exports = function(ctx) {
  const providerName = {
    github: "GitHub",
    facebook: "Facebook",
    google: "Google",
    mock: "Mock",
  }

  const authConfig = ctx.broker.serviceConfig.auth
  const webConfig = ctx.broker.serviceConfig.web
  if(!authConfig.enabled) {
    return {};
  }
  let result = {};
  for(let i=0; i < authConfig.providers.length; i++) {
    let provider = authConfig.providers[i]
    result[provider.name] = {
      name: providerName[provider.name] || provider.name,
      url: webConfig.baseUrl + '/auth/' + provider.name
    }
  }
  return result;
}
