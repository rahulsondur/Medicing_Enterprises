const express = require("express");
const router = express.Router();
const userController = require("../../../controller/userapp/v1/userController");
const {PLATFORM} = require("../../../constants/authConstant");
const auth = require("../../../middleware/auth");



router.get('/me',auth(PLATFORM.OPERATOR), userController.getLoggedInUserInfo);
router.put('/update/:id',auth(PLATFORM.OPERATOR), userController.updateUser);
router.delete('/delete/:id',auth(PLATFORM.OPERATOR), userController.deleteUser);


module.exports = router;


