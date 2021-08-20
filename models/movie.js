const mongoose = require('mongoose');
// const isURL = require('validator/lib/isURL');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  director: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
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
    minlength: 2,
    maxlength: 30,
  },
  image: {
    type: String,
    required: true,
    // validate: {
    //   validator: (v) => isURL(v),
    //   message: 'Неправильный формат ссылки',
    // },
  },
  trailer: {
    type: String,
    required: true,
    // validate: {
    //   validator: (v) => isURL(v),
    //   message: 'Неправильный формат ссылки',
    // },
  },
  thumbnail: {
    type: String,
    required: true,
    // validate: {
    //   validator: (v) => isURL(v),
    //   message: 'Неправильный формат ссылки',
    // },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    // required: true,
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    // required: true,
  },
  nameRU: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  nameEN: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

exports.Movie = mongoose.model('movie', movieSchema);
