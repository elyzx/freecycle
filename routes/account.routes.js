// require express
const router = require("express").Router();
// require user model
const UserModel = require('../models/User.model')
// require Neighbourhood model
const NeighbourhoodModel = require('../models/Neighbourhood.model')

//----------  MIDDLEWARE FOR PERMISSIONS ---------------
function checkLoggedIn(req, res, next) {
    if (req.session.loggedInUser) {
        next()
    }
    else {
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
                console.log(user)
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
            console.log(data)
            res.redirect('/')
        })
        .catch((err) => {
            next(err)
        })
})

module.exports = router;