const Router = require('express')
const { checkUser, onBoardUser, getAllUsers } = require('../controller/auth')

const router = Router()


router.post('/check-user', checkUser)
router.post('/onboard-user', onBoardUser)
router.get('/get-contacts', getAllUsers)

module.exports = router