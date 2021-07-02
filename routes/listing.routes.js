// Require express
const router = require("express").Router();
// Require listing model
const ListingModel = require("../models/Listing.model");

// ---------- VIEW/READ LISTINGS ---------- //
// Show the homepage - same as ('/')
// Handle GET request to /listings and render homepage
router.get('/listings', (req, res, next) => {
    res.render('index.hbs')
});

// Dynamically show an individual listing
// Handle GET request to /listings:id
router.get('/listings/:id', (req, res, next) => {
    let dynamicListingId = req.params.id
    
    ListingModel.findById(dynamicListingId)
        .then((listing) => {
            res.render('viewListing.hbs', {listing})
        })
        .catch(() => {
            next('Failed to find listing details')
        })
})

// Later on -- POST request to handle form submission/contact functionality

// ---------- CREATE LISTINGS ---------- //
// Render the Create Listing Page with form
// Handle GET requests to /create listings page
router.get('/create', (req, res, next) => {
    res.render('listings/createListing.hbs')
})

// Add form submissions to DB & redirect user to Manage page
// Handle POST requests to /create listings page 
router.post('create', (req, res, next) => {
    const {name, description, photo, expiration, status, neighbourhood} = req.body

    // Add the listing to our DB
    ListingModel.create({ame, description, photo, expiration, status, neighbourhood})
        .then(() => {
            res.redirect('/manage')
        })
        .catch(() => {
            next('Failed to create new listing')
        })
})
// ------------------------------------- //


// ---------- UPDATE LISTINGS ---------- //
// Show the user all their active listings
// Handle GET request to /manage listings page
router.get('/manage', (req, res, next) => {
    res.render('listings/manageListings.hbs')
});

// Enable the user to edit an existing listing
// GET
// POST

// ------------------------------------- //


// ---------- DELETE LISTING ----------- //
// Enable the user to delete an existing listing
router.post('/manage/:id/delete', (req, res, next) => {
    let dynamicListingId = req.params.id

    ListingModel.findByIdAndDelete(dynamicListingId)
        .then(() => {
            res.redirect('/manage')
        })
        .catch(() => {
            next('Failed to delete listing')
        })
})

// ------------------------------------- //
module.exports = router;