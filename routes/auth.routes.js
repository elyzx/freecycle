// require express
const router = require("express").Router();
// require user model
const UserModel = require('../models/User.model')
// require neighbourhood model
const NeighbourhoodModel = require('../models/Neighbourhood.model')
// require Listing model
const ListingModel = require("../models/Listing.model");
// require bcrypt for password encryption
const bcrypt = require('bcryptjs');

//---------------
//  LOGN-IN
//---------------
//----------  HANDLE GET REQUEST TO /login PAGE ---------------
router.get('/login', (req, res, next) => {
    res.render('auth/login.hbs')
})

router.post('/login', (req, res, next) => {
    const {email, password} = req.body

    UserModel.findOne({email})
        .then((user) => {
            if (user) {
                let isValid = bcrypt.compareSync(password, user.password)
                if (isValid) {
                    req.session.loggedInUser = user
                    req.app.locals.isLoggedIn = true;
                    res.redirect('/')
                }
                else {
                    res.render('auth/login', {error: 'Invalid password. Please check and try again!'})
                } 
            } 
            else {
                res.render('auth/login', {error: 'Email does not exist. Please check and try again!'})
            }
        })
        .catch((error) => {
            next(error)
        })
})

//---------------
//  SIGN-UP
//---------------
//----------  HANDLE GET REQUEST TO /register PAGE ---------------
router.get('/register', (req, res, next) => {

    NeighbourhoodModel.find({})
        .then((neighbourhood) => {
            req.session.neighbourhood = neighbourhood
            res.render('auth/register.hbs', {neighbourhood})
        })
        .catch((err) => {
            next(err)
        })
    })

router.post('/register', (req, res, next) => {
    const {name, email, password, neighbourhood} = req.body
    
    //check all fields are complete
    // if (!name || !email || !password || !neighbourhood) {
    //     res.render('auth/register.hbs', {error: 'Please enter all fields'})
    //     return;
    // }

    // Check email format
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email)) {
        res.render('auth/register.hbs', {neighbourhood: req.session.neighbourhood, error: 'Email address not valid. Please check and try again.'})
        return;
    }

    // check the password strength
    const passRegEx = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (!passRegEx.test(password)) {

        res.render('auth/register.hbs', {neighbourhood: req.session.neighbourhood, error: 'Password not strong enough. Make sure your password is 6-16 characters long and includes both a special character (!, @, #, $, *) and a number.'})
        return;  
    }

    // Password encyrption time! 
    // Generate salt
        const salt = bcrypt.genSaltSync(10);
        // Uses the salt and the password to create a hashed password
        const hash = bcrypt.hashSync(password, salt);

        UserModel.create({name, email, neighbourhood, password: hash})
            .then(() => {
                res.redirect('/login')
            })
            .catch((err) => {
                console.log(err)
                if (err.name === 'MongoError' && err.code === 11000) {
                    NeighbourhoodModel.find({})
                        .then((neighbourhood) => {
                            res.render('auth/register.hbs', {neighbourhood, error: "Email already registered."})
                        })
                        .catch((err) => {
                            next(err)
                        })
                }else{
                    next(err)
                }
            })
})

// Handles GET request to reset-password page
// router.get('/reset-password', (req, res, next) => {
//     res.render('auth/resetForm.hbs')
// })

// Thought process for a reset password functionality
// function secret() {
//     return "token"
// }

// // Handles POST request to reset-password page
// router.post('/reset-password', (req, res, next) => {
//     // Update resetPassword token in database for user with email in request
//     // if successful we send an email to the email address that includes a link
//     //  host/reset-password/userid/token
//     // to a reset-password page that contains a field to reset the password
// })

// router.get('/reset-password/:id/:token', (req, res, next) => {
//     // render a page that contains the token and user id in the form
//     // and has a new password field.
// })

// router.post('/reset-password/:id/:token', (req, res, next) => {
//     // update the password
// })

//---------------
//  SIGNOUT
//---------------
//----------  DESTROY THE SESSION ---------------
router.get('/logout', (req, res, next) => {
   req.session.destroy()

   // set global
   req.app.locals.isLoggedIn = false;
   res.redirect('/')
})

module.exports = router;