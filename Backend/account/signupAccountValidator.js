'use strict';
//check means any type {param ,body ,...}
const { check, body, param } = require('express-validator');
const validatorMiddleware = require('../middleware/validatorMiddleware');
const slugify = require('slugify');
const User = require('../models/userModel');



exports.signupAuthValidator = [
  //1-Rules

  body('name')
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

  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email adress')
    .custom((val) =>
      User.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error('Email already exist'));
        }
      })
    ),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .custom((pwd, { req }) => {
      if (pwd !== req.body.pwdConfirm) {
        throw new Error('Password confirm incorrect');
      }
      return true;
    }),

  body('pwdConfirm').notEmpty().withMessage('Password confirm is required'),

  body('phone')
    .optional()
    .isMobilePhone(['ar-JO'])
    .withMessage('Invalid phone number, only accepted Jo number'),

  body('profileImg').optional(),

  body('role').isEmpty().withMessage('The role should be empty'),

  // 2- Middleware => catch errors form rules if exist
  validatorMiddleware,
];
