'use-strict';

const bodyParser = require('body-parser');
// const routes = require('../api/index');

module.exports = (app) => {

  // Setup and config express app
  app.get('/status', (req, res) => {
    res.status(200).send('API online!');
  });
  
  app.set('trust proxy', true);

  app.use(require('morgan')('dev'));

  // parse application/json
  app.use(bodyParser.json());

  // Mount app routes
  // app.use(routes);

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
  });

  // error handler
  app.use(function(error, req, res, next) {   
    if (error.status) {
      res.status(error.status).send({message: error.message});
    } else {
      res.status(400).send({message: error.message});
    }
  });

  // Return the express app
  return app;
};
