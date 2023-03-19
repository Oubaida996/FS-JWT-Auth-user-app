'use strict';
const base64 = require('base-64');
const ApiError = require('../../utils/ApiError');
const userAuthenticatBasic = require('../../utils/authValidators/userAuthenticatBasic');

const basicAuth = async (req, res, next) => {
  if (req.headers['authorization']) {
    console.log(req.headers);
    let basicHeaderParts = req.headers.authorization.split(' ');
    console.log('basicHeaderParts >>> ',basicHeaderParts);
    let encodedPart = basicHeaderParts.pop(); //encoded(username:password);
    // console.log('encodedPart >>> ',encodedPart);
    let decoded = base64.decode(encodedPart); //username:password
    // console.log('decoded >>> ',decoded);
    let [email, password] = decoded.split(':'); //[username:password]
    // console.table({ email, password });
    const generateToken = await userAuthenticatBasic(email, password, next);
    if (generateToken) {
      req.token = generateToken;
      next();
    } else {
      console.log('dddddd');
      // throw new Error('The password is incorrect >>User valid');
      // next(new ApiError('User invalid', 407));
      return 'hello';
    }
  } else {
    next(
      new ApiError(
        `You don't have authenticate,your email or password is incorrect`,
        400
      )
    );
  }
};

module.exports = basicAuth;
