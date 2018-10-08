require('./lib/auth.helper');

module.exports = (options) => {
  const service = require('./lib/auth.service')(options);

  return {
    getAuthorizationCodeFlowToken: service.getAuthorizationCodeFlowToken,
    generateLoginURL: service.generateLoginURL,
    authenticateAuthorizationFlow: service.authenticateAuthorizationFlow
    // TODO: getClientCredentialToken: service.getClientCredentialToken
  };
};
