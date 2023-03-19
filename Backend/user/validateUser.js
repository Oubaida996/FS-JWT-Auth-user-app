const UserModel = require('../models/userModel');
const bcrybt = require('bcryptjs');
const ApiError = require('../utils/ApiError');

const validateUser = async (email, pwd) => {
  try {
    const user = await UserModel.findOne({ email: email });
    const valid = await bcrybt.compare(pwd, user.password);

    if (valid) {
      return user;
    } else {
      return false;
    }
  } catch (err) {
    throw new ApiError('Invalide user', 401);
  }
};

module.exports = validateUser;
