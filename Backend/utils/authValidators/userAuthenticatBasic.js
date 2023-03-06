'use strict';
const bcrybt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../../models/userModel');
const ApiError = require('../ApiError');

//=== Start userAuthenticatBasic
let userAuthenticatBasic = async (email, password, next) => {
  try {
    const user = await UserModel.findOne({ email: email });
    const valid = await bcrybt.compare(password, user.password);
    if (valid) {
      let newToken = jwt.sign(
        { username: user.email, id: user._id },
        process.env.SECRET
      );
      return newToken;
    } else {
      // throw new Error('The password is incorrect >> valid');
      next(
        new ApiError('The password is incorrect >> userAuthenticatBasic', 407)
      );
    }
  } catch (error) {
    // throw new Error('The user is not exist >> userAuthenticatBasic');
    next(new ApiError('The user is not exist >> userAuthenticatBasic', 407));
  }
};
//=== End userAuthenticatBasic

module.exports = userAuthenticatBasic;
