'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const core = require('../core/serviceJwt');

const UserSchema = new mongoose.Schema({

    nome: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,       
    },
    senha: {
        type: String,
        required: true,    
    },
    telefones: [{
        _id: false,
        numero: String,
        ddd: String
    }],

    ultimo_login: { type: Date },

    data_criacao: { type: Date },

    data_atualizacao: { type: Date },

    token: { type: String },   

}, { strict: true }, { versionKey: false },
);

UserSchema.set('toJSON', {});

UserSchema.options.toJSON.transform = function (doc, ret, options) {
    delete ret['__v'];
    delete ret['senha'];
    delete ret['salt'];
    return ret;
}

UserSchema.method('setPassword', async function (senha) {
    const salt = await bcrypt.genSalt(10);
    this.senha = await bcrypt.hash(senha, salt); // Encrypted Password
})

UserSchema.method('setToken', async function () {
    
    this.token = await core.generateToken(
        {
            id: this._id,
            ultimo_login: this.ultimo_login
        }
    )

    return this.token;
})

UserSchema.method('signIn', async function (senha, token) {

    try {
        const userIsValid = await bcrypt.compare(senha, this.senha);      
        if (userIsValid) {
            this.ultimo_login = new Date();
            this.data_atualizacao = this.ultimo_login;   
            token.valor = await this.setToken();                
            await this.save();
            return true;
        }
        else {
            return false;
        }
    }
    catch (err) {
        throw err;
    }

})
UserSchema.post('save', function(error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
      next(new Error('E-mail já existente'));
    } else {
      next(error);
    }
  });

module.exports = mongoose.model('Users', UserSchema);