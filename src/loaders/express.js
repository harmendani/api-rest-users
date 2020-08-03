'use-strict';

const bodyParser = require('body-parser');
const routes = require('../routes/index');

module.exports = (app) => {

  // Setup and config express app
  app.get('/status', (req, res) => {
    res.status(200).send({mensagem : 'API is Online!'});
  });
  
  app.set('trust proxy', true);

  app.use(require('morgan')('dev'));

  // parse application/json
  app.use(bodyParser.json());

  // Mount app routes
  app.use(routes);

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error({mensagem : 'Endpoint não encontrado'});
    err['status'] = 404;
    next(err);
  });

  // error handler
  app.use(function(error, req, res, next) {   
    if (error.status) {
      res.status(error.status).send({mensagem: error.message});
    } else {
      res.status(400).send({mensagem: error.message});
    }
  });

  // Return the express app
  return app;
};
