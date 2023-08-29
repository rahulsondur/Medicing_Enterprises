const express = require("express");
const router = express.Router();
const machineController = require("../../../controller/admin/v1/machineController");
const {PLATFORM} = require("../../../constants/authConstant");
const auth = require("../../../middleware/auth");


router.post('/create',auth(PLATFORM.OPERATOR),machineController.addMachine);
router.post('/list',auth(PLATFORM.OPERATOR), machineController.findAllMachine);
router.get('/get/:id',auth(PLATFORM.OPERATOR), machineController.getMachine);
router.post('/count',auth(PLATFORM.OPERATOR),machineController.getMachineCount);

module.exports = router;


