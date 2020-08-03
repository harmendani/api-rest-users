'use-strict';
const User = require('../models/users');
const service = require('../core/serviceJwt');

module.exports = async (req, res, next) => {
  try {
    const token = req.header('Authorization').split(' ')[1];
    const isValid = await service.authenticate(token);
    let authorized = false; // default

    req.user = isValid.id;
    req.ultimo_login = isValid.ultimo_login;


    await User.findOne({'_id': req.user}).then(async (user) => {
      if (user && user.token === token) {
        authorized = true; // Assign to authorized
      }
    })
        .catch((err) => {
          throw err;
        });

    // Authorized
    if (authorized) next();

    // Not Authorized
    else {
      throw new Error();
    }
  } catch (err) {
    err['message'] = 'Não autorizado';
    err['status'] = 401;
    next(err);
  }
};
