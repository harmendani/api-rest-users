'use-strict'
const config = require('../config').secretJwt; // Import SECRET KEY
const jwt = require('jsonwebtoken');

// Gera token
exports.generateToken = async (data) => {
    return jwt.sign(data, config, null);
};

// Verifica autenticidade do token enviado pelo cliente
exports.authenticate = async (token) => {
    return jwt.verify(token, config);
};

// Retorna payload decodificado
exports.decodedToken = async (token) => {
    return jwt.verify(token, config);
};