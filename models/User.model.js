const { Schema, model } = require("mongoose");
let mongoose = require('mongoose');
require('./Neighbourhood.model');

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
  passwordResetToken: String,
  neighbourhood:  {
    ref: 'Neighbourhood',
    type: mongoose.Schema.Types.ObjectId
  },
  list: [{
    ref: 'Listing',
    type: mongoose.Schema.Types.ObjectId
  }]
});

const User = model("User", userSchema);

module.exports = User;