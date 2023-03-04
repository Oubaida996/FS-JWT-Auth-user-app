'use strict';

const express = require('express');

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../services/userService');

const {
  createUserValidator,
  updateUserValidator,
  getSpecificUserValidator,
  deleteUserValidator,
} = require('../utils/validators/userValidators');

const router = express.Router();

router.route('/').get(getUsers).post(createUserValidator, createUser);

router
  .route('/:id')
  .get(getSpecificUserValidator, getUser)
  .put(updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);

module.exports = router;
