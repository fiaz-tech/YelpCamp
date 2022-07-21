const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');

const User = require('../models/user');

const user = require('../controllers/users');


router.get('/register', user.renderRegisterForm )

router.post('/register', catchAsync(user.registerUser))

router.get('/login', user.loginForm)

router.post('/login',  passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), user.loginUser)

router.get('/logout', user.logout)



module.exports = router;