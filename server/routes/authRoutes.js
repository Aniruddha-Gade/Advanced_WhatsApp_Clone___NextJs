const Router = require('express')
const { checkUser } = require('../controller/auth')

const router = Router()


router.post('/check-user', checkUser)

module.exports = router