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
    console.log('valid', valid);

    if (valid) {
      let newToken = jwt.sign(
        { username: user.email, id: user._id },
        process.env.SECRET
      );
      return newToken;
    } else {
      console.log('Hiiiiiii');
      next(
        new ApiError('The password is incorrect >> userAuthenticatBasic', 407)
      );
      console.log('Byeeeeeeeeeeeeee');
    }
  } catch (error) {
    // throw new Error('The user is not exist >> userAuthenticatBasic');
    next(new ApiError('The user is not exist >> userAuthenticatBasic', 407));
  }
};
//=== End userAuthenticatBasic

module.exports = userAuthenticatBasic;
