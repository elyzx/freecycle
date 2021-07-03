const router = require("express").Router();

const ListingModel = require("../models/Listing.model");

/* GET home page */
router.get("/", (req, res, next) => {

  ListingModel.find()
    .then((listings) => {
      res.render("index", {listings})
    })
    .catch(() => {
      next('No available listings. Check back later!')
    })
});

module.exports = router;
