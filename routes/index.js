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
router.get("/", checkLoggedIn,  (req, res, next) => {


  ListingModel.find()
    .populate('neighbourhood')
    .populate('user')
    .then((listings) => {
      
      console.log(listings)

      res.render("index", {listings})
    })
    .catch(() => {
      next('No available listings. Check back later!')
    })
});

module.exports = router;
