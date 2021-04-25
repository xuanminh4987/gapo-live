const express = require('express')
const router = express.Router()
const messagesController = require('../controllers/messages.controller')

router.get('/:_id', messagesController.getMessageByID)

router.post('/', messagesController.setMessage)

router.put('/:_id', messagesController.updateMessageByID)

module.exports = router