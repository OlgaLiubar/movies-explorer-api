const express = require('express');
const { updateProfile, getUserInfo } = require('../controllers/users');
const { validatePatchProfileInfo } = require('../middlewares/validation');

const usersRoutes = express.Router();

usersRoutes.get('/me', getUserInfo);
usersRoutes.patch('/me', validatePatchProfileInfo, updateProfile);

exports.usersRoutes = usersRoutes;
