const express = require('express')
const router = express.Router()
const groupsController = require('../controllers/groups.controller')

router.get('/', groupsController.getGroups)

router.get('/:_id', groupsController.getGroupByID)

router.post('/', groupsController.createGroup)

router.put('/:_id', groupsController.updateGroupByID)

module.exports = router