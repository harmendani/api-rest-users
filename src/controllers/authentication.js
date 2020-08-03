'use-strict';
const service = require('../core/serviceJwt');

module.exports = async (req, res, next) => {
  try {
    const token = req.header('Authorization').split(' ')[1];
    const isValid = await service.authenticate(token);
    req.user = isValid.id;
    next();
  } catch (err) {
    err['status'] = 401;
    next(err);
  }
};