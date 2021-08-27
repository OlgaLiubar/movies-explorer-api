const validator = require('validator');
const { celebrate, Joi } = require('celebrate');
const { INVALID_URL_MSG } = require('../utils/constants');

const validateSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validateCreateUserBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
});

const validateCreateMovieBody = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string()
      .required()
      .custom((value) => {
        const result = validator.isURL(value);
        if (result) {
          return value;
        }
        throw new Error(INVALID_URL_MSG);
      }),
    trailer: Joi.string()
      .required()
      .custom((value) => {
        const result = validator.isURL(value);
        if (result) {
          return value;
        }
        throw new Error(INVALID_URL_MSG);
      }),
    thumbnail: Joi.string()
      .required()
      .custom((value) => {
        const result = validator.isURL(value);
        if (result) {
          return value;
        }
        throw new Error(INVALID_URL_MSG);
      }),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const validateDeleteMovie = celebrate({
  params: Joi.object()
    .keys({
      id: Joi.string().length(24).hex(),
    })
    .unknown(true),
});

const validatePatchProfileInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

module.exports = {
  validateSignin,
  validateCreateUserBody,
  validateCreateMovieBody,
  validateDeleteMovie,
  validatePatchProfileInfo,
};
