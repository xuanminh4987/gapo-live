const express = require('express')
const router = express.Router()
const postsController = require('../controllers/posts.controller')

router.get('/', postsController.getPosts)

router.get('/:_id', postsController.getPostByID)

router.post('/', postsController.createPost)

router.put('/:_id', postsController.updatePostByID)

module.exports = router