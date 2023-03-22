'user strict';

const express = require('express');
const router = express.Router();
const basicAuth = require('../middleware/basicAuthMiddleware');

const { login, signup } = require('./accountService.js');
const { signupAuthValidator } = require('./signupAccountValidator');

router.post('/signup', signupAuthValidator, signup);

router.post('/login', basicAuth, login);

module.exports = router;