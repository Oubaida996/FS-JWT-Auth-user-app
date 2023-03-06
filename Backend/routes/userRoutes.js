'use strict';

const express = require('express');
const bearerAuth = require('../middleware/auth/bearerAuth');

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  changePassword,
} = require('../services/userService');

const {
  createUserValidator,
  updateUserValidator,
  getSpecificUserValidator,
  deleteUserValidator,
  updateUserPasswordValidator,
} = require('../utils/validators/userValidators');

const router = express.Router();

router.put('/change-password/:id', updateUserPasswordValidator, changePassword);

router.route('/').get(getUsers).post(createUserValidator, createUser);

router
  .route('/:id')
  .get(getSpecificUserValidator, bearerAuth, getUser)
  .put(updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);

module.exports = router;
