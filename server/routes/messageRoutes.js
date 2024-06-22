const Router = require('express');
const { addMessage } = require('../controller/messageControllar');
const router = Router();

router.post("/add-message", addMessage)






module.exports = router