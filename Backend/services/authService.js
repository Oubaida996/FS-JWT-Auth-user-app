'use strict';
const UserModel = require('../models/userModel');
const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/ApiError');

// @desc    Sign in
// @route   Post /api/v1/auth
// @access  Public
exports.signin = asyncHandler(async (req, res, next) => {
  console.log(req.user);
  res.status(200).json({
    token: req.token,
  });
});


// @desc    Create a new user(sign up)
// @route   Post /api/v1/auth
// @access  Public
exports.signup = asyncHandler(async (req, res, next) => {
  const { name, email, password, phone, profileImg } = req.body;
  const user = await UserModel.create({
    name,
    slug: slugify(name),
    email,
    password,
    phone,
    profileImg,
  });
  if (!user) next(new ApiError(`You cann't sign up now, try later `, 503));
  res.status(201).json({ data: user });
});
