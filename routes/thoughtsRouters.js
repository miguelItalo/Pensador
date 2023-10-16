const express = require('express')
const router = express.Router()

//Controller
const ThoughtsController = require('../controllers/ThoughtsController')

// Middleware
const checkAuth = require('../helpers/auth').checkAuth

router.get('/dashboard', checkAuth, ThoughtsController.dashboard)
router.get('/add', checkAuth, ThoughtsController.createThoughts)
router.post('/add', checkAuth, ThoughtsController.createThoughtsSave)
router.get('/', ThoughtsController.showThoughts)

module.exports = router
