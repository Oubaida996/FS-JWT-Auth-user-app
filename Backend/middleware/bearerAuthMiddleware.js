'use strict';
const base64 = require('base-64');
const ApiError = require('../utils/ApiError');
const validateToken = require('../token/validateToken');

const bearerAuth = async(req, res, next) => {
    if (req.headers['authorization']) {
        // 'Bearer token'
        let bearerHeaderParts = req.headers.authorization.split(' ');
        // console.log('bearerHeaderParts >>> ',bearerHeaderParts); // ['Bearer','token']
        let token = bearerHeaderParts.pop(); //encoded(username:password)
        // console.log('Token >>> ',token);

        try {
            const user = await validateToken(token, next);
            if (user) {
                req.user = user;
                next();
            }
        } catch (error) {
            next(new ApiError('You does not have permission to access', 403));
        }
    } else {
        next(new ApiError('token is not correct or null', 403));
    }
};

module.exports = bearerAuth;