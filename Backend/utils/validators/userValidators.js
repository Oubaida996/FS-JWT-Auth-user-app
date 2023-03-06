'use strict';
//check means any type {param ,body ,...}
const { check, body, param } = require('express-validator');
const validatorMiddleware = require('../../middleware/validatorMiddleware');
const slugify = require('slugify');
const User = require('../../models/userModel');
const bcrybt = require('bcryptjs');
exports.createUserValidator = [
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

  body('role')
    .optional()
    .isIn(['user', 'admin'])
    .withMessage('The role is not exist'),

  // 2- Middleware => catch errors form rules if exist
  validatorMiddleware,
];

exports.getSpecificUserValidator = [
  //1-Rules
  check('id').isMongoId().withMessage('Invalid user id format'),
  // 2- Middleware => catch errors form rules if exist
  validatorMiddleware,
];

exports.updateUserValidator = [
  //1-Rules
  param('id').isMongoId().withMessage('Invalid user id format'),

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

  body('email').isEmpty().withMessage('Email is not required'),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),

  body('phone')
    .optional()
    .isMobilePhone(['ar-JO'])
    .withMessage('Invalid phone number, only accepted Jo number'),

  body('profileImg').optional(),

  body('role')
    .optional()
    .isIn(['user', 'admin'])
    .withMessage('The role is not exist'),

  // 2- Middleware => catch errors form rules if exist
  validatorMiddleware,
];

exports.deleteUserValidator = [
  //1-Rules
  check('id').isMongoId().withMessage('Invalid user id format'),
  // 2- Middleware => catch errors form rules if exist
  validatorMiddleware,
];

exports.updateUserPasswordValidator = [
  // 1-Rules
  param('id').isMongoId().withMessage('Invalid user id format'),

  body('currentPwd')
    .notEmpty()
    .withMessage('Current password is required')
    .custom(async (currentPwd, { req }) => {
      const user = await User.findById(req.params.id);

      if (!user) throw new Error('There is no user for this id');

      const isCorrectPwd = await bcrybt.compare(currentPwd, user.password);

      if (!isCorrectPwd) throw new Error('The current password is incorrect');
    }),
    
  body('newPwd')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .custom((newPwd, { req }) => {
      if (newPwd !== req.body.pwdConfirm) {
        throw new Error('Password confirm incorrect');
      }
      return true;
    }),

  body('pwdConfirm').notEmpty().withMessage('Password confirm is required'),

  // 2- Middleware => catch errors form rules if exist
  validatorMiddleware,
];
