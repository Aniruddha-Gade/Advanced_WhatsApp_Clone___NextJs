const Router = require('express');
const { addMessage, getMessages } = require('../controller/messageControllar');
const router = Router();

router.post("/add-message", addMessage)
router.get("/get-messages/:from/:to", getMessages)






module.exports = router