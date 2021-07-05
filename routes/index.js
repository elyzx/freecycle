const router = require("express").Router();
const ListingModel = require("../models/Listing.model");

//----------  PAGES THAT REQUIRE AN ACCOUNT TO BE VISITED ---------------
//FIRST PAGE TO BE RENDERED AFTER LOG-IN
router.get("/", (req, res, next) => {
  if (req.session.loggedInUser) {

    ListingModel.find()
    .populate('neighbourhood')
    .then((listings) => {
      
      console.log(listings.title)

      res.render("index", {listings})
     
    })
    .catch(() => {
      next('No available listings. Check back later!')
    })
  }
  else {
    res.redirect('/login')
  }
});

//----------------- The code below was migrated to the auth route -------------
/* GET home page */
// router.get("/", (req, res, next) => {
//   if (req.session.loggedInUser) {
//     ListingModel.find()
//     .then((listings) => {
//       res.render("index", {listings})
//     })
//     .catch(() => {
//       next('No available listings. Check back later!')
//     })
//   }
//   else {
//     res.redirect('/login')
//   }
// });
//----------------- The code above was migrated to the auth route -------------


//----------------- The code below - in the case that a dynamic rendering is required -------------
// router.get("/:id", (req, res, next) => {
//   if (req.session.loggedInUser) {
//     ListingModel.find()
//     .then((listings) => {
//       res.render("index", {listings})
//     })
//     .catch(() => {
//       next('No available listings. Check back later!')
//     })
//   }
//   else {
//     res.redirect('/login')
//   }
// });
//----------------- The code above - in the case that a dynamic rendering is required -------------

module.exports = router;
