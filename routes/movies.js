const express = require('express');

const moviesRoutes = express.Router();
const { getAllMovies, createMovie, deleteMovie } = require('../controllers/movies');

moviesRoutes.get('/', getAllMovies);
moviesRoutes.post('/', createMovie);
moviesRoutes.delete('/:id', deleteMovie);

exports.moviesRoutes = moviesRoutes;
