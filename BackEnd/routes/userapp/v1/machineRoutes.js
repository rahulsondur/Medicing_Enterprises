const express = require("express");
const router = express.Router();
const machineController = require("../../../controller/admin/v1/machineController");
const {PLATFORM} = require("../../../constants/authConstant");
const auth = require("../../../middleware/auth");



router.post('/list',auth(PLATFORM.USERAPP), machineController.findAllMachine);
router.get('/get/:id',auth(PLATFORM.USERAPP), machineController.getMachine);
router.post('/count',auth(PLATFORM.USERAPP),machineController.getMachineCount);

module.exports = router;


