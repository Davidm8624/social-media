const router = require('express').Router()
const {getUsernameAvailable, createUser} = require('../controllers/user')
router.route('/').post(createUser)
router.route('/:username').get(getUsernameAvailable)

module.exports = router