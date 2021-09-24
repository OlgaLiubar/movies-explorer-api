const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const ConflictError = require('../errors/conflict-err');
const BadRequestError = require('../errors/bad-request-err');
const UnauthorizedError = require('../errors/unauthorized-err')
const { ERROR_MSG, LOGGED_OUT_MSG } = require('../utils/constants');

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, email, password: hash }))
    .then((user) => res.send({ name, email, _id: user._id }))
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        next(new ConflictError(ERROR_MSG.CONFLICT_EMAIL));
      } else if (err.name === 'ValidationError') {
        next(
          new BadRequestError(ERROR_MSG.BAD_REQUEST),
        );
      }
      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' });
      // console.log(token);
      return res
        .cookie('jwt', token, {
        // token - наш JWT токен, который мы отправляем
          maxAge: 3600000,
          httpOnly: true,
          sameSite: 'None',
          secure: true,
        })
        .send({ message: 'Авторизация прошла успешно.' });
    })
    .catch(() => {
      throw new UnauthorizedError(ERROR_MSG.UNAUTHORIZED);
    })
    .catch(next);
};

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(ERROR_MSG.NOT_FOUND_USER);
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new BadRequestError(ERROR_MSG.BAD_REQUEST),
        );
      }
      return next(err);
    });
};

module.exports.updateProfile = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(ERROR_MSG.NOT_FOUND_USER);
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        next(new ConflictError(ERROR_MSG.CONFLICT_EMAIL));
      } else if (err.name === 'ValidationError') {
        next(
          new BadRequestError(ERROR_MSG.BAD_REQUEST),
        );
      }
      return next(err);
    });
};

module.exports.logout = (req, res) => {
  res.clearCookie('jwt')
    .send({ message: LOGGED_OUT_MSG });
};
