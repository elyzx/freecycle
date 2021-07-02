// require express
const router = require("express").Router();

// require user model
const UserModel = require('../models/User.model')

//---------------
//  SIGN-IN
//---------------

// Handle GET request to /login page
router.get('/login', (req, res, next) => {
    res.render('auth/login.hbs')
})

// router.post('/login', (req, res, next) => {
    
// })

//---------------
//  SIGN-UP
//---------------

// Handle GET request to /signup page
router.get('/signup', (req, res, next) => {
    res.render('auth/signup.hbs')
})

// router.post('/signup', (req, res, next) => {
    
// })

//---------------
//  SIGNOUT
//---------------

// router.get('/login', (req, res, next) => {
//     req.session.destroy()

//     // set global
//     req.app.locals.isLoggedIn = false;
//     res.redirect('/')
//  })


module.exports = router;