const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { updateProfile, getUserInfo, } = require('../controllers/users');
// const urlValidation = require('../middlewares/validation');

const usersRoutes = express.Router();

usersRoutes.get('/me', getUserInfo);

usersRoutes.patch(
  '/me',
  // celebrate({
  //   body: Joi.object().keys({
  //     name: Joi.string().required().min(2).max(30),
  //     email: Joi.string().required().min(2).max(30),
  //     password: Joi.string().required().min(2).max(30),
  //   }),
  // }),
  updateProfile,
);


exports.usersRoutes = usersRoutes;