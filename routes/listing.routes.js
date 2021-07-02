// require express
const router = require("express").Router();

// require listing model

// Handle GET request to /manage listings page
router.get('/manage', (req, res, next) => {
    res.render('listings/manageListings.hbs')
})


// Handle GET request to /create listings page
router.get('/create', (req, res, next) => {
    res.render('listings/createListing.hbs')
})


module.exports = router;