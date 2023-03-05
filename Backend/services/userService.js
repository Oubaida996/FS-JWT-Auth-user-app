'use strict';

const UserModel = require('../models/userModel');
const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/ApiError');

// @desc    Get a list of Users
// @route   GET /api/v1/users?page=<number>&limit=<number>
// @query   page : integer  , limit : integer
// @access  Private
exports.getUsers = asyncHandler(async (req, res) => {
  // (req.query.page * 1) means convert the string into integer number
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const users = await UserModel.find({}).skip(skip).limit(limit);
  res.status(200).json({
    results: users.length,
    page,
    data: users,
  });
});

// @desc    Get a specific user
// @route   GET /api/v1/users/:id
// @params  id
// @access  Private
exports.getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.find({ _id: id });
  if (!user) return next(`The user isn't exist`, 404);
  res.status(200).json({ data: user });
});

// @desc    Create a new user
// @route   Post /api/v1/users
// @access  Private
exports.createUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone, role, profileImg } = req.body;
  const user = await UserModel.create({
    name,
    slug: slugify(name),
    email,
    password,
    phone,
    role,
    profileImg,
  });
  res.status(201).json({ data: user });
});

// @desc    Update a user
// @route   Put /api/v1/users/:id
// @access  Private
exports.updateUser = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const { id } = req.params;
  const user = await UserModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    {
      new: true,
    }
  );
  if (!user) return next(new ApiError(`The user isn't exist`, 404));
  res.status(200).json({ data: user });
});

// @desc    Delete a user
// @route   Delete /api/v1/users/:id
// @access  Private
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await UserModel.findOneAndUpdate(
    { _id: id },
    { active: false },
    {
      new: true,
    }
  );
  if (!user) return next(new ApiError("The user isn't exist", 404));

  res.status(204).send();
});
