// const { NODE_ENV, JWT_SECRET } = process.env;
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, email, password: hash }))
    .then((user) => res.send({ name, about, avatar, email, _id: user._id }))
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже зарегистрирован'));
      } else if (err.name === 'ValidationError') {
        next(
          new BadRequestError(
            'Переданы некорректные данные при создании пользователя.',
          ),
        );
      }
      return next(err);
    });
};