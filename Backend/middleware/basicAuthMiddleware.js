'use strict';
const base64 = require('base-64');
let generateToken = require('../token/generateToken');
const validateUser = require('../user/validateUser');
const ApiError = require('../utils/ApiError');

const basicAuth = async(req, res, next) => {
    if (req.headers['authorization']) {
        let basicHeaderParts = req.headers.authorization.split(' ');
        // console.log('basicHeaderParts >>> ',basicHeaderParts);
        let encodedPart = basicHeaderParts.pop(); //encoded(username:password);
        // console.log('encodedPart >>> ',encodedPart);
        let decoded = base64.decode(encodedPart); //username:password
        // console.log('decoded >>> ',decoded);
        let [email, password] = decoded.split(':'); //[username:password]

        try {
            const user = await validateUser({email,pwd:password});
            if (user) {
                req.token = generateToken(user.email, user._id);
                req.user= user;
                next();
            } else {
                next(
                    new ApiError(
                        `You aren't authenticated, verify your password please`,
                        401
                    )
                );
            }
        } catch (err) {
            next(
                new ApiError(
                    `You are not authenticated, verify your email and password please`,
                    401
                )
            );
        }
    }
};

module.exports = basicAuth;