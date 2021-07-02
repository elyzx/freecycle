// Making our DB connection
require('../db')

// Require Mongoose
const mongoose = require('mongoose')

// Get our Model
const ListingModel = require('../models/Listing.model')

ListingModel.insertMany([
    {title: 'Free sofa', description: 'Hi there, I am moving and no longer need my sofa. Pick up ASAP.'},
])
    .then(() => {
        console.log('Listing added')
        mongoose.connection.close()
    })  
    .catch(() => {
        console.log('Seeding failed')
        mongoose.connection.close()
    })  