'use-strict';
const User = require('../models/users');
const Core = require('../core/serviceJwt');


// Create user
exports.signup = async (req, res, next) => {

    const newUser = new User(req.body);
    newUser.data_criacao = new Date();
    newUser.ultimo_login = newUser.data_criacao;

    await newUser.setPassword(req.body.senha);  
    const token = await newUser.setToken();
    
    newUser.save()
        .then(user => {
            user.token = token;
            res.status(201).send(user);
        })
        .catch(err => {
            next(err)
        });

};

exports.signin = (req, res, next) =>{



}