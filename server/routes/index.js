'use strict';

const
    apiRoute = require('./apis')
    //homeRoute = require('./home'),
    //errorRoute = require('./error');

function init(server) {

    server.post('*', function (req, res, next) {
        console.log('Request was made to: ' + req.originalUrl);
        return next();
    });

    server.use((err, req, res, next) => {
      if (err instanceof SyntaxError) {
        const resJson = {'errors': [{message: "The body of your request is not valid json!"}]};
        return res.status(415).json(resJson);
      }
      const resJson = {'errors': [{"message":"Internal Server Error"}]};
      console.error(err);
      res.status(500).json(resJson);
  });

    /*server.get('/', function (req, res) {
        res.redirect('/home');
    });*/

    server.use('/api', apiRoute);
    //server.use('/home', homeRoute);
    //server.use('/error', errorRoute);
}

module.exports = {
    init: init
};
