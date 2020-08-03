'use-strict';

// Express imports 
const { Router } = require('express');
const route = Router();

// Import controllers
// const authentication = require('../controllers/authentication');
const controller = require('../controllers/users');
const auth = require('../controllers/authentication');

// Endpoints
module.exports = (app) => {
    app.use('/users', route);    
    route.post('/', controller.signup);
    route.post('/signin', controller.signin);

    // Private routes, needs token 
    route.use(auth);
    route.get('/:id', controller.buscarUsuarios);
};

/*
// Availbles: Public Routes
// Availbles : Private Routes
router.use(authentication); // JWT
router.get('/', controller.login); // Find user

module.exports = router;*/