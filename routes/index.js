const router = require('express').Router();
// const { usersRoutes } = require('./users');
const { moviesRoutes } = require('./movies');
// const nonExistentRoute = require('./nonExistentRoute');
const { createUser } = require('../controllers/users');

router.post('/signup', createUser);

// router.use('/users', usersRoutes);

router.use('/movies', moviesRoutes);

// router.use(nonExistentRoute);

module.exports = router;