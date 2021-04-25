const mongoose = require('mongoose')

const Messages = mongoose.model('message', {
    userID_1: String,
    userID_2: String,
    messages: Array
}, 'messages')

module.exports = Messages