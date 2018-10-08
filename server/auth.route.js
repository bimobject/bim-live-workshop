module.exports = (app, bimApi) => {
  app.use('/login', (req, res) => {
    console.log('Method', req.method);
    console.log('url', req.url);
    console.log('Getting stuff on login');
    bimApi.authenticateAuthorizationFlow(req.query.code, (err) => {
      if(err) {
        console.log('Could not authenticate user', err)
      } else {
        console.log('Authenticated!')
        res.redirect('/');
      }
    })
  });
};
