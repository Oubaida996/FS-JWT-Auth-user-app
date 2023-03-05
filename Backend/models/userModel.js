'use strict';
const mongoose = require('mongoose');
//1- Create Shema
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Name of user is required'],
    },

    slug: {
      type: String,
      lowercase: true,
    },

    email: {
      unique: true,
      type: String,
      trim: true,
      required: [true, 'Email of user is required'],
      lowercase: true,
    },

    password: {
      type: String,
      required: [true, 'Email of user is required'],
      minlingth: [8, 'To short password'],
    },

    phone: String,

    profileImg: 'string',

    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },

    active: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

//2-export model

const User = mongoose.model('User', userSchema);

module.exports = User;
