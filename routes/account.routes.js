// require express
const router = require("express").Router();

// require user model
const UserModel = require('../models/User.model')


// Handle GET request to /account
router.get('/account', (req, res, next) => {
    res.render('account.hbs')
})


module.exports = router;