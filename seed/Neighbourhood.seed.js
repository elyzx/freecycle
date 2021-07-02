// Making our DB connection
require('../db')

// Require Mongoose
const mongoose = require('mongoose')

// Get our Model
const NeighbourhoodModel = require('../models/Neighbourhood.model')

NeighbourhoodModel.insertMany([
    {name: 'Cologne'},
    {name: 'Amsterdam'},
    {name: 'Berlin'}
])
    .then(() => {
        console.log('Neighbourhood added')
        mongoose.connection.close()
    })  
    .catch(() => {
        console.log('Seeding failed')
        mongoose.connection.close()
    })  