// require express
const router = require("express").Router();
// require user model
const UserModel = require('../models/User.model')
// require Neighbourhood model
const NeighbourhoodModel = require('../models/Neighbourhood.model')

//----------  MIDDLEWARE FOR PERMISSIONS ---------------
function checkLoggedIn(req, res, next) {
    if (req.session.loggedInUser) {
        console.log(`User '${req.session.loggedInUser._id}' is logged in`)
        req.app.locals.isLoggedIn = true;
        next()
    }
    else {
        req.app.locals.isLoggedIn = false;
        res.redirect('/login')
    }
  }

// Handle GET request to /account
router.get('/account', checkLoggedIn, (req, res, next) => {
    let userObj = req.session.loggedInUser
    const {neighbourhood} = req.body

    UserModel.findById(userObj._id)
        .populate('neighbourhood')
        .then((user) => {
            NeighbourhoodModel.find(neighbourhood)
                .then((neighbourhood) => {
                    res.render('account.hbs', {user, neighbourhood})
                })
                .catch((err) => {
                    next(err)
                })
        })
        .catch((err)=> {
            next(err)
        })
    })

// Handle POST request for /account
router.post('/account', checkLoggedIn, (req, res, next) => {
    let userObj = req.session.loggedInUser
    const {name, email, neighbourhood} = req.body

    UserModel.findByIdAndUpdate(userObj._id, {name, email, neighbourhood}, {new: true})
        .then((data) => {
            res.redirect('/')
        })
        .catch((err) => {
            next(err)
        })
})

// Delete account
router.get('/account/delete/:id', checkLoggedIn, (req, res, next) => {
    let userId = req.session.loggedInUser
    let dynamicAccountId = req.params.id

    if (userId._id != dynamicAccountId) {
        return next(`User ${userId._id} tried to delete another user's account :(`)
    }
    
    UserModel.findByIdAndDelete(userId)
        .then(() => {
            req.session.destroy()
            req.app.locals.isLoggedIn = false;
            res.redirect('/')
        })
        .catch(() => {
            next('Failed to delete user account.')
        })
    })

module.exports = router;