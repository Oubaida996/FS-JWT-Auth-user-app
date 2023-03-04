'use strict';
//check means any type {param ,body ,...}
const { check } = require('express-validator');
const { default: slugify } = require('slugify');
const validatorMiddleware = require('../../middleware/validatorMiddleware');
const User = require('../../models/userModel');

exports.getSpecificUserValidator = [
  //1-Rules
  check('id').isMongoId().withMessage('Invalid user id format'),
  // 2- Middleware => catch errors form rules if exist
  validatorMiddleware,
];

exports.createUserValidator = [
  //1-Rules

  check('name')
    .notEmpty()
    .withMessage('Name of user is required')
    .isLength({ max: 32 })
    .withMessage('Too long user name')
    .isLength({ min: 2 })
    .withMessage('Too short user name')
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),

  check('email')
    .notEmpty.withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email adress')
    .custom((val) => {
      User.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error('Email already exist'));
        }
      });
    }),

  check('password')
    .isEmpty()
    .withMessage('Password is required')
    .isLength({ max: 8 })
    .withMessage('Password must be at least 8 characters'),

  check('phone')
    .optional()
    .isMobilePhone(['ar-JO'])
    .withMessage('Invalid phone number, only accepted Jo number'),

  check('profileImg').optional(),

  check('role').optional(),

  // 2- Middleware => catch errors form rules if exist
  validatorMiddleware,
];

exports.updateUserValidator = [
  //1-Rules
  check('id').isMongoId().withMessage('Invalid user id format'),
  check('name')
    .notEmpty()
    .withMessage('User name is required')
    .isLength({ max: 32 })
    .withMessage('Too long user name')
    .isLength({ min: 2 })
    .withMessage('Too short user name'),
  // 2- Middleware => catch errors form rules if exist
  validatorMiddleware,
];

exports.deleteUserValidator = [
  //1-Rules
  check('id').isMongoId().withMessage('Invalid user id format'),
  // 2- Middleware => catch errors form rules if exist
  validatorMiddleware,
];
