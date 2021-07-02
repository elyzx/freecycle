// Making our DB connection
require('../db')

// Require Mongoose
const mongoose = require('mongoose')

// Get our Model
const UserModel = require('../models/User.model')

UserModel.insertMany([
    {name: 'Manish', email: 'manish@hey.com', neighbourhood: '60df1f981a98202ec3a66622'},
    {name: 'Julie', email: 'julie@hey.com', neighbourhood: '60df1f981a98202ec3a66622'},
    {name: 'Yanis', email: 'yanis@hey.com', neighbourhood: '60df1f981a98202ec3a66623'},
    {name: 'Pablo', email: 'pablo@hey.com', neighbourhood: '60df1f981a98202ec3a66624'}
])
    .then(() => {
        console.log('User added')
        mongoose.connection.close()
    })  
    .catch(() => {
        console.log('Seeding failed')
        mongoose.connection.close()
    })  