// Require express
const router = require("express").Router();
// Require listing model
const ListingModel = require("../models/Listing.model");
// Require User model
const UserModel = require("../models/User.model");
// Require Neighbourhood model
const NeighbourhoodModel = require("../models/Neighbourhood.model");

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
<<<<<<< HEAD
//Handle GET requests to /create listings page

//----------------- The code below was migrated to the auth route -------------
// router.get('/create',  (req, res, next) => {
//     console.log('is this working?')
//     NeighbourhoodModel.find({})
//     .then((neighbourhood) => {
//         console.log(neighbourhood)

//         res.render('listings/createListing.hbs', {neighbourhood})
//     })
//      .catch((err) => {
//         next(err)
//      })
// })
//----------------- The code above was migrated to the auth route -------------


=======
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
>>>>>>> 4221e91d4fe18da7fa14ab32a8afaf86c19fcd85

// Add form submissions to DB & redirect user to Manage page
// Handle POST requests to /create listings page 
router.post('/create/:id', (req, res, next) => {
    const id = req.params.id
    const {title, description, neighbourhood} = req.body

    // Add the listing to our DB
    ListingModel.create({title, description, neighbourhood, user: id})
        .then(() => {
            // push the listing id to the user model
            // UserModel.update(
            //     { _id: listing_.id},
            //     { $push: {list: listing} },
            // )
            res.redirect('/')
        })
        .catch(() => {
            next('Failed to create new listing')
        })
})
// ------------------------------------- //
// hi!
// attempt no 2


// ---------- UPDATE LISTINGS ---------- //
// Show the user all their active listings
// Handle GET request to /manage listings page
router.get('/manage', checkLoggedIn, (req, res, next) => {
    let userId = req.session.userInfo
    console.log(req.session)
    
    UserModel.findById(userId)
        .then((user) => {
            console.log(user)
            res.render('listings/manageListings.hbs', {user})
        })
        .catch(() => {
            next('Failed to find user details')
        })
})

// Enable the user to edit an existing listing
router.get('/edit', checkLoggedIn, (req, res, next) => {
    res.render('listings/editListing.hbs')
})
// POST

// ------------------------------------- //

// ---------- DELETE LISTING ----------- //
// Enable the user to delete an existing listing
router.post('/manage/:id/delete', checkLoggedIn, (req, res, next) => {
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