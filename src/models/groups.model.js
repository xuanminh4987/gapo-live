const mongoose = require('mongoose')

const Groups = mongoose.model('group', {
    name: String,
    description: String,
    posts: Array,
    avatar: String
}, 'groups')

module.exports = Groups