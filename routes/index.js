const router = require("express").Router();

const ListingModel = require("../models/Listing.model");


/* GET home page */
router.get("/", (req, res, next) => {
  if (req.session.loggedInUser) {
    ListingModel.find()
    .then((listings) => {
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

module.exports = router;
