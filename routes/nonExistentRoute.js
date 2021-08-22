const nonExistentRoute = require('express').Router();
const NotFoundError = require('../errors/not-found-err');
const { ERROR_MSG } = require('../utils/constants');

nonExistentRoute.get('*', () => {
  throw new NotFoundError(ERROR_MSG.NOT_FOUND_PATH);
});

module.exports = nonExistentRoute;
