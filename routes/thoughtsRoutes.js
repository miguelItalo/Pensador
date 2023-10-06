const express = require('express')
const router = express.Router()

//Controller
const ThoughtsController = require('../controllers/ThoughtsController')

router.get('/', ThoughtsController.showThoughts)

module.exports = router
