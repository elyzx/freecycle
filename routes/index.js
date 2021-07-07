const router = require("express").Router();
const ListingModel = require("../models/Listing.model");
const UserModel = require("../models/User.model");


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

  //const userAdressId = req.session.loggedInUser
 
  ListingModel.find()
    .populate('neighbourhood')
    .populate('user')
    .then((listings) => {
      UserModel.findById(req.session.loggedInUser._id)
        .then((user) => {

          
          
      //const userMap = user.map(x => x.neighbourhood)
      //console.log(userMap)

      //console.log(user.neighbourhood, 'this is the user neighbourhood')

      const listingsMap = listings.map(x => x.neighbourhood._id);

      let matchId = [];

      for( let i = 0; i < listingsMap.length; i++ ) {
        if(listingsMap[i].toString() == user.neighbourhood.toString()){
          matchId.push(listingsMap[i])

        }
        console.log(typeof user.neighbourhood, 'this is the user in the for loop')
        console.log(typeof listingsMap[i], 'this is the list in the for loop')
        console.log(matchId)
      }

      console.log(matchId)

      console.log(listingsMap, 'User id address')

        res.render("index", {matchId})
     


        })
        .catch((err) => {
          next(err)
        })

    
    })
    .catch(() => {
      next('No available listings. Check back later!')
    })
});

module.exports = router;
