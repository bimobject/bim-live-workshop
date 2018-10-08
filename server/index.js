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
    client_id: '',
    client_secret: '',
    redirect_uri: '',
    scope: ''
  }
}

/**
  This is where we declare the  bimApi, the plan is to release this as a NPM module.
*/
const bimApi = require('./bim-api-sdk')(options);

require('./auth.route')(app, bimApi);

/**
  These are routes that we use in the APP.
*/

app.get('/api/authenticated', (req, res) => {
  if (bimApi.getAuthorizationCodeFlowToken()) {
    res.send({
      authenticated: true
    });
  } else {
    res.send({
      authenticated: false
    });
  }
});

app.get('/api/products',bodyParser.json(), (req, res) => {
  console.log('REQUEST: Search products', req.query.fullText);
  sendRequest('products?filter.fullText=' + req.query.fullText).then(response => {
    res.send(response)
  })
});

app.get('/api/product/:id',bodyParser.json(), (req, res) => {
  console.log('REQUEST: More info on product with id', req.params['id']);
  sendRequest('products/' + req.params['id']).then(response => {
    res.send(response)
  })
});

app.get('/api/download/:productId/:fileId', (req, res) => {
  sendRequest('products/' + req.params['productId'] + '/files/' + req.params['fileId']+'/binary').then(response => {
    res.send(response)
  })
});

app.get('/api/login', (req, res) => {
  console.log('got request')
  res.send({
    url: bimApi.generateLoginURL()
  })
});
app.use('/', express.static(path.join(__dirname, '/../dist/bim-live-workshop')));

app.listen(9090, '0.0.0.0', () => {
  console.log('Your dev server is running on http://localhost:9090');
});

/**
  A function that sends request to the API, one could call it a proxy
*/

const sendRequest = (_request) => {
  return new Promise((resolve, reject) => {
    const options = {
      uri: 'https://api.bimobject.com/search/v1/' + _request,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + bimApi.getAuthorizationCodeFlowToken()
      }
    }
    console.log('GET Requesting', options.uri)
    request(options, (err, response, body) => {
      console.log(response.headers)
      if (err) {
        reject({
          err: err
        });
      } else {
        resolve(body);
      }
    });
  });
}
