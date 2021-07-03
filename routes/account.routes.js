// require express
const router = require("express").Router();

// require user model
const UserModel = require('../models/User.model')
// require Neighbourhood model
const NeighbourhoodModel = require('../models/Neighbourhood.model')



// Handle GET request to /account
// router.get('/account', (req, res, next) => {
//     res.render('account.hbs')
// })

router.get('/account/:id', (req, res, next) => {
    let dynamicListingId = req.params.id

    UserModel.findById(dynamicListingId)
        .then((selectecUser) => {

            NeighbourhoodModel.find({})
            .then((neighbourhood) => {
                res.render('account.hbs', {neighbourhood , selectecUser})
            })
            .catch((err) => {
                next(err)
            })

        })
        .catch((err)=> {
            next(err)
        })
})

router.post('/account/:id', (req, res, next) => {
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