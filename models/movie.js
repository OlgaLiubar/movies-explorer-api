const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');
const { INVALID_URL_MSG } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },
  director: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
      message: INVALID_URL_MSG,
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
      message: INVALID_URL_MSG,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
      message: INVALID_URL_MSG,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    ref: 'user',
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100,
  },
  nameEN: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100,
  },
});

exports.Movie = mongoose.model('movie', movieSchema);
