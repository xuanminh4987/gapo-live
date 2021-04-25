const mongoose = require('mongoose')

const Users = mongoose.model('user', {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    birthday: String,
    gender: String,
    avatar: String,
    friends: Array
}, 'users')

module.exports = Users