const router = require('express').Router();
// const { usersRoutes } = require('./users');
const { moviesRoutes } = require('./movies');
// const nonExistentRoute = require('./nonExistentRoute');

// router.use('/users', usersRoutes);

router.use('/movies', moviesRoutes);

// router.use(nonExistentRoute);

module.exports = router;