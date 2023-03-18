'use strict';
const base64 = require('base-64');
const ApiError = require('../../utils/ApiError');
const userAuthenticatBasic = require('../../utils/authValidators/userAuthenticatBasic');

const basicAuth = async (req, res, next) => {
  if (req.headers['authorization']) {
    let basicHeaderParts = req.headers.authorization.split(' ');
    // console.log('basicHeaderParts >>> ',basicHeaderParts);
    let encodedPart = basicHeaderParts.pop(); //encoded(username:password);
    // console.log('encodedPart >>> ',encodedPart);
    let decoded = base64.decode(encodedPart); //username:password
    // console.log('decoded >>> ',decoded);
    let [email, password] = decoded.split(':'); //[username:password]

    const generateToken = await userAuthenticatBasic(email, password, next);
    if (generateToken) {
      req.token = generateToken;
      next();
    } else {
      next(new ApiError('User invalid', 407));
    }
  } else {
    next(
      new ApiError(
        `You don't have authenticate, enter your email and password please`,
        400
      )
    );
  }
};

module.exports = basicAuth;
