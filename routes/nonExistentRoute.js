const nonExistentRoute = require('express').Router();
const NotFoundError = require('../errors/not-found-err');

nonExistentRoute.get('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = nonExistentRoute;
