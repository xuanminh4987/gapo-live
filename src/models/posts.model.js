const mongoose = require('mongoose')

const Posts = mongoose.model('post', {
    userID: String,
    content: String,
    timestamps: String,
    reaction: {
        like: Array,
        love: Array,
        haha: Array,
        wow: Array,
        sad: Array,
        angry: Array
    },
    comments: Array
})

module.exports = Posts