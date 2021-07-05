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
router.get('/account/:id', checkLoggedIn, (req, res, next) => {
    let dynamicUserId = req.params.id
    const {name, email, neighbourhood} = req.body

    UserModel.findById(dynamicUserId)
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
router.post('/account/:id', checkLoggedIn, (req, res, next) => {
    let dynamicListingId = req.params.id

    const {name, email, neighbourhood} = req.body

    UserModel.findByIdAndUpdate(dynamicListingId, {name, email, neighbourhood})
        .then(() => {
            res.redirect()
        })
        .catch((err) => {
            next(err)
        })
})

module.exports = router;