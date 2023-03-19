const UserModel = require('../models/userModel');
const bcrybt = require('bcryptjs');
const ApiError = require('../utils/ApiError');

const validateUser = async ({email=null, pwd=null, id = null}) => {
  try {
    const objFilter = id ? { _id: id } : { email: email };
    const user = await UserModel.findOne(objFilter);

    //If we don't have id, that mean we just send email and pwd
    if (!id) {
      const valid = await bcrybt.compare(pwd, user.password);
      return valid ? user : false;
    } else {
      // Will return the user id we have id and the user is exist, I returned here because validateToken funcion
      return user;
    }
  } catch (err) {
    throw new ApiError('Invalide user', 401);
  }
};

module.exports = validateUser;
