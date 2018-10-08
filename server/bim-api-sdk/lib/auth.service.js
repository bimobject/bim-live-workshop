const request = require('request');
const authHelper = require('./auth.helper');
let tokenExpiration = '';
let authorizationCodeFlowToken;
let authorizationCodeFlowRefreshToken;
let tokenUrl = `https://accounts.bimobject.com/identity/connect/token`;
module.exports = (_options) => {
  const authorizationCodeFlow = _options.authorizationCodeFlow;

  const authenticateAuthorizationFlow = (code, callback) => {
    authorizationCodeFlow.code = code;
    authorizationCodeFlow.grant_type = 'authorization_code';
    authorizationCodeFlow.code_verifier = authHelper.verifier;
    let requestOptions = {
      uri: tokenUrl,
      rejectUnauthorized: false,
      method: 'POST',
      form: authorizationCodeFlow
    };

    request(requestOptions, (err, response, body) => {
      if (err) {
        console.log(err);
      } else {
        try {
          console.log('RESPONSE (generate token):', body);
          let parsedBody = JSON.parse(body);
          setToken(parsedBody.access_token);
          setRefreshToken(parsedBody.refresh_token);
          setExpiration(parsedBody.expires_in);
          console.log('Refresh in ' + parsedBody.expires_in + 's');
          callback(null); // err is null
        } catch (e) {
          console.log(e);
          callback(e); // err is true
        }
      }
    });
  };

  const authenticateAuthorizationFlowRefresh = () => {
    let authorizationCodeFlowRefresh = {
      grant_type: 'refresh_token',
      refresh_token: authorizationCodeFlowRefreshToken,
      client_id: authorizationCodeFlow.client_id,
      client_secret: authorizationCodeFlow.client_secret
    };
    let requestOptions = {
      uri: tokenUrl,
      method: 'POST',
      form: authorizationCodeFlowRefresh
    };
    request(requestOptions, (err, response, body) => {
      if (err) {
        console.log(err);
      } else {
        try {
          console.log('RESPONSE (token refresh):', body);
          let parsedBody = JSON.parse(body);

          setToken(parsedBody.access_token);
          setRefreshToken(parsedBody.refresh_token);
          setExpiration(parsedBody.expires_in);
        } catch (e) {
          console.log(e);
        }
      }
    });
  };

  const setToken = (token) => {
    authorizationCodeFlowToken = token;
  };
  const setRefreshToken = (refreshToken) => {
    authorizationCodeFlowRefreshToken = refreshToken;
  };

  const setExpiration = (expiresIn) => {
    tokenExpiration = expiresIn;
  };

  const generateLoginURL = () => {
    let uri = `https://accounts.bimobject.com/identity/connect/authorize?client_id=${authorizationCodeFlow.client_id}&response_type=code&redirect_uri=${authorizationCodeFlow.redirect_uri}&scope=${authorizationCodeFlow.scope}&code_challenge=${authHelper.codeChallenge}&code_challenge_method=S256`;
    return uri;
  };

  const getAuthorizationCodeFlowToken = () => {
    return authorizationCodeFlowToken;
  };
  return {
    authenticateAuthorizationFlow: authenticateAuthorizationFlow,
    generateLoginURL: generateLoginURL,
    getAuthorizationCodeFlowToken: getAuthorizationCodeFlowToken
  };
};
