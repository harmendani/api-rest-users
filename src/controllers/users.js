'use-strict';
const User = require('../models/users');
const Core = require('../core/serviceJwt');
const bcrypt = require('bcrypt');

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

exports.signin = (req, res, next) => {

    User.findOne({ email: req.body.email }).then(async user => {

        // Verify : user exist and valid password          
        if (user && await user.signIn(req.body.senha, token = {})) {
            user.token = token.valor;  // Recover new token
            res.status(201).send(user);
        }
        else {
            const err = new Error('Usuário e/ou senha inválidos');
            err['status'] = 401;
            throw err;
        }
    })
        .catch(err => {
            next(err);
        })
};

exports.buscarUsuarios = (req, res, next) => {

    try {       
        if(req.user == req.params.id){
            res.status(200).send();
        }
        else{
            let err =  new Error('Não autorizado');
            err['status'] = 401;
            throw err;
        }       
              
    } catch (err) {             
        next(err);
    }
};