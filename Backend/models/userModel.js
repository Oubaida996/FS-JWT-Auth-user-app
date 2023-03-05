'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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

userSchema.pre('save', async function (next) {
  if (!this.password.isModified('password')) return next();
  //Hashing user password
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

//2-export model

const User = mongoose.model('User', userSchema);

module.exports = User;
