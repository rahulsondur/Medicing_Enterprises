const express = require("express");
const router = express.Router();
const machineController = require("../../../controller/admin/v1/machineController");
const {PLATFORM} = require("../../../constants/authConstant");
const auth = require("../../../middleware/auth");



router.post('/list',auth(PLATFORM.ClIENT), machineController.findAllMachine);
router.get('/get/:id',auth(PLATFORM.ClIENT), machineController.getMachine);
router.post('/count',auth(PLATFORM.ClIENT),machineController.getMachineCount);
router.put('/update/:id',auth(PLATFORM.ClIENT), machineController.updateMachine);

module.exports = router;


