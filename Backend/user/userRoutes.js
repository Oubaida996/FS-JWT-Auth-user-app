'use strict';

const express = require('express');
const aclAuth = require('../middleware/aclAuthMiddleware');
const bearerAuth = require('../middleware/bearerAuthMiddleware');

const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    changePassword,
} = require('./userService');

const {
    createUserValidator,
    updateUserValidator,
    getSpecificUserValidator,
    deleteUserValidator,
    updateUserPasswordValidator,
} = require('./userValidators');

const router = express.Router();

router.put('/change-password/:id', updateUserPasswordValidator, changePassword);

router
    .route('/')
    .get(getUsers)
    .post(createUserValidator, bearerAuth, aclAuth('delete'), createUser);

router
    .route('/:id')
    .get(getSpecificUserValidator, bearerAuth, getUser)
    .put(updateUserValidator, updateUser)
    .delete(deleteUserValidator, deleteUser);

module.exports = router;