const { Schema, model } = require("mongoose");
let mongoose = require('mongoose');
require('./Neighbourhood.model')
require('./User.model')

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const listingSchema = new Schema({
 title: String,
 description: String,
 photo: String,
 expiration: Date,
 status: String,
 neighbourhood: {
    ref: 'Neighbourhood',
    type: mongoose.Schema.Types.ObjectId
  },
  user: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId
  }
});

const Listing = model("Listing", listingSchema);

module.exports = Listing;