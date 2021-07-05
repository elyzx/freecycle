const router = require("express").Router();
const ListingModel = require("../models/Listing.model");

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

//----------  PAGES THAT REQUIRE AN ACCOUNT TO BE VISITED ---------------
//FIRST PAGE TO BE RENDERED AFTER LOG-IN
<<<<<<< HEAD
router.get("/", (req, res, next) => {
  if (req.session.loggedInUser) {

    ListingModel.find()
    .populate('neighbourhood')
=======
router.get("/", checkLoggedIn, (req, res, next) => {

  ListingModel.find()
>>>>>>> 309a8bccb1dd12ed749c40055f7379d5f3bd946c
    .then((listings) => {
      
      console.log(listings.title)

      res.render("index", {listings})
<<<<<<< HEAD
     
=======
>>>>>>> 309a8bccb1dd12ed749c40055f7379d5f3bd946c
    })
    .catch(() => {
      next('No available listings. Check back later!')
    })
});

module.exports = router;
