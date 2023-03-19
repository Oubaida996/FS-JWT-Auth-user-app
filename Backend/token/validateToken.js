'use strict';
const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');
const validateUser = require( '../user/validateUser' );

const validateToken = async(token, next) => {
    const parsedToken = jwt.verify(token, process.env.SECRET);
    const user =await validateUser({id:parsedToken.id});
    if (user) return user;
    next(new ApiError('The user is not exist', 404));
};

module.exports = validateToken;