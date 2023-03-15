const router = require('express').Router()
const { createUser, getUsers, addExercise, getLogs, filterLogs } = require('../controllers/controllers.js')

router.post('/api/users', createUser)
router.post('/api/users/:_id/exercises', addExercise)
router.get('/api/users', getUsers)
router.get('/api/users/:_id/logs', getLogs)

module.exports = router