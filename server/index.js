const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const request = require('request');

/**
  This is the options object needed by bim-api-sdk
*/
const options = {
  authorizationCodeFlow: {
    client_id: 'LMGlQfPR6pBhdASg6TPjmFzesyBIlwJR',
    client_secret: 'yDrocqE6R6Iif7u7phiXlMIIloEb7JDUNpmlwm01zjIY9yp0rUEm1VmgiJ6xbZbx',
    redirect_uri: 'http://localhost:9090/login',
    scope: 'search_api search_api_downloadbinary '
  }
}

const bimApi = require('bim-api-sdk')(options);
console.log(bimApi)

require('./auth.route')(app, bimApi);
app.use(bodyParser.json());

app.get('/api/authenticated', (req, res) => {
  if(bimApi.getAuthorizationCodeFlowToken()) {
    res.send({authenticated: true});
  } else {
    res.send({authenticated: false});
  }
});

app.get('/api/products', (req, res) => {
  console.log('REQUEST: Search products', req.query.fullText);
  sendSearchRequest(req.query.fullText).then(response => {
    res.send(response)
  })
});

app.get('/api/download', (req, res) => {
  console.log('REQUEST: Download product');
  res.send({
    success: true
  });
});

app.get('/api/login', (req, res) => {
  console.log('got request')
  res.send({url: bimApi.generateLoginURL()})
});
app.use('/', express.static(path.join(__dirname, '/../dist/bim-live-workshop')));

app.listen(9090, '0.0.0.0', () => {
  console.log('Your dev server is running on http://localhost:9090');
});

const sendSearchRequest = (searchText) => {
  return new Promise((resolve, reject) => {
    const options = {
      uri: 'https://api.bimobject.com/search/v1/products?filter.fullText='+searchText,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + bimApi.getAuthorizationCodeFlowToken()
      }
    }
    request(options, (err, response, body) => {
      if(err) {
        reject({err: err});
      } else {
        resolve(body);
      }
    });
  });
}