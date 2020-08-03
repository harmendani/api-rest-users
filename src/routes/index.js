'use strict';
const {Router} = require('express');
const app = new Router();

const routeUsers = require('./users');

// Inject Control
routeUsers(app);

module.exports = app;

