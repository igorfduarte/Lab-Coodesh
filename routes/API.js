const express = require('express')
const {GetAPIDetails} = require('../controllers/APIController')
const router = express.Router()

router.route('/').get(GetAPIDetails)

module.exports = router