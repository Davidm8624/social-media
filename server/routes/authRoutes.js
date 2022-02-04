const router = require('express').Router()
const {postLoginUser} = require('../controllers/auth')
router.route('/').post(postLoginUser)
module.exports = router