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
                    res.render('auth/login', {error: 'Invalid password'})
                } 
            } 
            else {
                res.render('auth/login', {error: 'Email does not exist'})
            }
        })
        .catch((error) => {
            next(error)
        })
})

//---------------
//  SIGN-UP
//---------------
//----------  HANDLE GET REQUEST TO /signup PAGE ---------------
router.get('/signup', (req, res, next) => {

    NeighbourhoodModel.find({})
    .then((neighbourhood) => {
        console.log(neighbourhood)
        res.render('auth/signup.hbs', {neighbourhood})
    })
    .catch((err) => {
        next(err)
    })
})

router.post('/signup', (req, res, next) => {
    const {name, email, password, neighbourhood} = req.body
    
    // check all fields are complete
    // if (!name || !email || !password || !neighbourhood) {
        // res.render('auth/signup.hbs', {error: 'Please enter all fields'})
        // return;
    // }

    // Check email format
    // const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // if (!re.test(email)) {
        // res.render('auth/signup.hbs', {error: 'Email address not valid. Please check and try again.'})
        // return;
    // }

    // check the password strength
    // const passRegEx = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    // if (!passRegEx.test(password)) {
        // res.render('auth/signup.hbs', {error: 'Password not strong enough. Make sure your password is 6-16 characters long and includes both a special character and a number.'})
        // return;
    // }

    // Password encyrption time! 
    // Generate salt
        const salt = bcrypt.genSaltSync(10);
        // Uses the salt and the password to create a hashed password
        const hash = bcrypt.hashSync(password, salt);

        UserModel.create({name, email, neighbourhood, password: hash})
            .then(() => {
                res.redirect('/')
            })
            .catch((err) => {
                next(err)
            })
})

<<<<<<< HEAD
//-------------------
//  PAGE PERMISSIONS
//-------------------
//----------  MIDDLEWARE FOR PERMISSIONS ---------------
function checkLoggedIn(req, res, next) {
    if (req.session.loggedInUser) {
        next()
    }
    else {
        res.redirect('/login')
    }
}

//----------  PAGES THAT REQUIRE AN ACCOUNT TO BE VISITED ---------------
//FIRST PAGE TO BE RENDERED AFTER LOG-IN
router.get("/",   (req, res, next) => {
    if (req.session.loggedInUser) {
      ListingModel.find()
      .then((listings) => {
        res.render("index", {listings})
        //res.render('index.hbs', {title: req.session.loggedInUser.title} )   --- TO KEEP THE CONTENT AFTER RELOADING THE BROWSER ---
      })
      .catch(() => {
        next('No available listings. Check back later!')
      })
    }
    else {
      res.redirect('/login')
    }
  });


// MANAGE LISTINGS PAGE - /manage
// router.get('/manage', checkLoggedIn, (req,res) => {
//    res.render('listings/manageListings.hbs')
// })

// LISTINGS PAGE - /listings
// router.get('/listings', checkLoggedIn, (req,res) => {
//     res.render('listings/viewListing.hbs')
//  })

// EDIT PAGE - /EDIT
// router.get('/edit', checkLoggedIn, (req,res) => {
//     res.render('listings/editListing.hbs')
//  })

 // CREATE LISTINGS PAGE - /create
router.get('/create', checkLoggedIn, (req, res, next) => {
    
    NeighbourhoodModel.find({})
    .then((neighbourhood) => {
        res.render('listings/createListing.hbs', {neighbourhood})
    })
     .catch((err) => {
        next(err)
     })
})

// ACCOUNT PAGE - /account
//  router.get('/account', checkLoggedIn, (req,res) => {
//     res.render('account.hbs')
//  })
=======
>>>>>>> 4221e91d4fe18da7fa14ab32a8afaf86c19fcd85

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