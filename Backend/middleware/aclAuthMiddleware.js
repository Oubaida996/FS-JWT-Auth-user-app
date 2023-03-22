'use strict';

const ApiError = require('../utils/ApiError');

const aclAuth = (action) => {
    return (req, res, next) => {
        if (req.user.actions.includes(action)) {
            next();
        } else {
            next(new ApiError('Access denied', 403));
        }
    };
};

module.exports = aclAuth;