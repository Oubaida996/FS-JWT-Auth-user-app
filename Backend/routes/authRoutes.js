'user strict';

const express = require('express');
const router = express.Router();
const basicAuth = require('../middleware/auth/basicAuth');

const { signin, signup } = require('../services/authService');
const { signupAuthValidator } = require( '../utils/authValidators/signupAuthValidator' );

router.post('/signup', signupAuthValidator ,signup);

router.get('/signin', basicAuth, signin);

module.exports = router;
