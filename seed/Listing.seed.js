// Making our DB connection
require('../db')

// Require Mongoose
const mongoose = require('mongoose')

// Get our Model
const ListingModel = require('../models/Listing.model')

ListingModel.insertMany([
    {title: 'Free sofa', description: 'Hi there, I am moving and no longer need my sofa. Pick up ASAP.', neighbourhood: '60df1f981a98202ec3a66622', user: '60df1fb11af3522ec5e6b195'},
    {title: 'Test1', description: 'afsiasubfncksnfcsdm', neighbourhood: '60df1f981a98202ec3a66622', user: '60df1fb11af3522ec5e6b196'},
    {title: 'Test2', description: 'esbfdibesnifjnwajndmas', neighbourhood: '60df1f981a98202ec3a66623', user: '60df1fb11af3522ec5e6b197'},
    {title: 'Test3', description: 'rdfbuienwsifnewskjfncsdhkc', neighbourhood: '60df1f981a98202ec3a66624', user: '60df1fb11af3522ec5e6b198'},
])
    .then((response) => {
        console.log(response)
        console.log('Listing added')
        mongoose.connection.close()
    })  
    .catch(() => {
        console.log('Seeding failed')
        mongoose.connection.close()
    })  