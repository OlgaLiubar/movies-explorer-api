const { User } = require('../models/user');
// const { isEmail, isURL } = require('validator');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/unauthorized-err');

module.exports.findUserByCredentials = (email, password) => {
  return User.findOne({ email })
  .select('+password')
  .then((user) => {
    if (!user) {
      return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
    }
    return bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
      }
      return user;
    });
  });
};