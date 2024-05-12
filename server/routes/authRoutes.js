const Router = require('express')
const { checkUser, onBoardUser } = require('../controller/auth')

const router = Router()


router.post('/check-user', checkUser)
router.post('/onboard-user', onBoardUser)

module.exports = router