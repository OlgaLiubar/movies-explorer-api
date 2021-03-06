const router = require('express').Router();
const { usersRoutes } = require('./users');
const { moviesRoutes } = require('./movies');
const nonExistentRoute = require('./nonExistentRoute');
const { createUser, login, logout } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validateSignin, validateCreateUserBody } = require('../middlewares/validation');

router.post('/signup', validateCreateUserBody, createUser);
router.post('/signin', validateSignin, login);
router.post('/signout', logout);

router.use(auth);
router.use('/users', usersRoutes);
router.use('/movies', moviesRoutes);
router.use('*', nonExistentRoute);

module.exports = router;
