const express = require('express');

const moviesRoutes = express.Router();
const { getAllMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { validateCreateMovieBody, validateDeleteMovie } = require('../middlewares/validation');

moviesRoutes.get('/', getAllMovies);
moviesRoutes.post('/', validateCreateMovieBody, createMovie);
moviesRoutes.delete('/:id', validateDeleteMovie, deleteMovie);

exports.moviesRoutes = moviesRoutes;
