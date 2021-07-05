// Require express
const router = require("express").Router();
// Require listing model
const ListingModel = require("../models/Listing.model");
// Require User model
const UserModel = require("../models/User.model");
// Require Neighbourhood model
const NeighbourhoodModel = require("../models/Neighbourhood.model");
const Listing = require("../models/Listing.model");

//----------  MIDDLEWARE FOR PERMISSIONS ---------------
function checkLoggedIn(req, res, next) {
    if (req.session.loggedInUser) {
        next()
    }
    else {
        res.redirect('/login')
    }
}

// ---------- VIEW/READ LISTINGS ---------- //
// Handle GET request to /listings and redirect to homepage
router.get('/listings', checkLoggedIn, (req, res, next) => {
    res.redirect('/')
});

// Handle GET request to /listings:id
router.get('/listings/:id', checkLoggedIn, (req, res, next) => {
    let dynamicListingId = req.params.id
    
    // UserModel.findById(dynamicUserId)

    // UserModel.find({})
    //     .then((user) => {
    //         console.log(user)
    //         res.render('listings/viewListing.hbs', {user})
    ListingModel.findById(dynamicListingId)
        .then((listing) => {
            res.render('listings/viewListing.hbs', {listing})
        })
        .catch(() => {
            next('Failed to find listing details')
        })


        // .then((user) => {
        //     console.log(user)
        //     res.render('listings/viewListing.hbs', {user})
        // })
        // .catch(() => {
        //     next('Failed to find user details')
        // })
})

// Later on -- POST request to handle form submission/contact functionality


// ---------- CREATE LISTINGS ---------- //
// Handle GET requests to /create listings page
router.get('/create', checkLoggedIn, (req, res, next) => {
    
    NeighbourhoodModel.find({})
    .then((neighbourhood) => {
        res.render('listings/createListing.hbs', {neighbourhood})
    })
     .catch((err) => {
        next(err)
     })
})

// Add form submissions to DB & redirect user to Manage page
// Handle POST requests to /create listings page 
router.post('/create', (req, res, next) => {
    let userObj = req.session.loggedInUser
    const {title, description, neighbourhood} = req.body

    // Add the listing to our DB
    ListingModel.create({title, description, neighbourhood, user: userObj._id})
        .then((listing) => {
                console.log(listing._id)

                UserModel.findByIdAndUpdate(userObj._id, { $push: {list: listing._id} }, {new: true})
                    .then(() => {
                        res.redirect('/')
                    })
                    .catch(() => {
                        next('Failed to add listing to user')
                    })
        })
        .catch(() => {
            next('Failed to create new listing')
        })
})
// ------------------------------------- //


// ---------- UPDATE LISTINGS ---------- //
// Show the user all their active listings
// Handle GET request to /manage listings page
// check logged in
// check which user
// check the user's list of listings
// display the info for those listings only
router.get('/manage', checkLoggedIn, (req, res, next) => {
    let userId = req.session.loggedInUser
    console.log(req.session)

    UserModel.findById(userId)
        .populate('list')
        .then((user) => {
            console.log(userId)
            res.render('listings/manageListings.hbs', {user})
        })
        .catch(() => {
            next('Failed to find user details')
        })

})


// Enable the user to edit an existing listing
router.get('/edit', checkLoggedIn, (req, res, next) => {
    let userId = req.session.loggedInUser

    ListingModel.findById(userId._id)
        .populate('list')
        .then((user) => {
            res.render('listings/editListing.hbs')
        })



    res.render('listings/editListing.hbs')
})
// POST

// ------------------------------------- //

// ---------- DELETE LISTING ----------- //
// Enable the user to delete an existing listing
router.post('/manage/delete', checkLoggedIn, (req, res, next) => {
    let userId = req.session.loggedInUser

    ListingModel.findByIdAndDelete(userId)
        .then(() => {
            res.redirect('/manage')
        })
        .catch(() => {
            next('Failed to delete listing')
        })
})

// router.post('/movies/:id/delete', (req, res, next) => {
//     let id = req.params.id

//     MovieModel.findByIdAndRemove(id)
//         .then(() => {
//             res.redirect('/movies');
//         })
//         .catch((err) => {
//             next(err);
//         })
// })

// ------------------------------------- //
module.exports = router;