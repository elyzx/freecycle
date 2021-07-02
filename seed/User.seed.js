// Making our DB connection
require('../db')

// Require Mongoose
const mongoose = require('mongoose')

// Get our Model
const UserModel = require('../models/User.model')

UserModel.insertMany([
    {name: 'Manish', email: 'manish@hey.com'},
    {name: 'Julie', email: 'julie@hey.com'},
    {name: 'Yanis', email: 'yanis@hey.com'},
    {name: 'Pablo', email: 'pablo@hey.com'}
])
    .then(() => {
        console.log('User added')
        mongoose.connection.close()
    })  
    .catch(() => {
        console.log('Seeding failed')
        mongoose.connection.close()
    })  