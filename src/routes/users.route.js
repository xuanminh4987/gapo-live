const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users.controller')

router.get('/', usersController.getUsers)

router.get('/:_id', usersController.getUserByID)

router.post('/', usersController.handleUser)

router.put('/:_id', usersController.updateUserByID)

module.exports = router