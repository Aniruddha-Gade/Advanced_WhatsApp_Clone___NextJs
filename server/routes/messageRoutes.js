const Router = require('express');
const { addMessage, getMessages, uploadImageMessage } = require('../controller/messageControllar');
const router = Router();
const multer = require('multer')



const uploadImage = multer({ dest: 'uploads/images' })

router.post("/add-message", addMessage)
router.get("/get-messages/:from/:to", getMessages)
router.post("/add-image-message", uploadImage.single('image'), uploadImageMessage)





module.exports = router