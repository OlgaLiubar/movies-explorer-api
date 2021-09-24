const jwt = require('jsonwebtoken');
// const { NODE_ENV, JWT_SECRET } = require('../config');
const UnauthorizedError = require('../errors/unauthorized-err');
const NODE_ENV = 'production'
const JWT_SECRET = '5f853b640758fb055b09e8c3bf492d5da66e4fe4a7a997717e5f893c5d7ae517'

module.exports = (req, res, next) => {
  // console.log("req.cookies.jwt", req.cookies.jwt);
  // console.log("req.cookies", req.cookies);
  const token = req.cookies.jwt;
  // console.log("token", token);
  // if (!token) {
  //   throw new UnauthorizedError('Необходима авторизация.');
  // }
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
    console.log('payload', payload);
  } catch (err) {
    throw new UnauthorizedError('Необходима авторизация.');
  }

  req.user = payload;
  console.log(payload);
  console.log(payload);
  return next();
};