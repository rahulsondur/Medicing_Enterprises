const express = require("express");
const router = express.Router();
const machineController = require("../../../controller/admin/v1/machineController");
const {PLATFORM} = require("../../../constants/authConstant");
const auth = require("../../../middleware/auth");


router.post('/create',auth(PLATFORM.ADMIN),machineController.addMachine);
router.post('/list',auth(PLATFORM.ADMIN), machineController.findAllMachine);
router.get('/get/:id',auth(PLATFORM.ADMIN), machineController.getMachine);
router.post('/count',auth(PLATFORM.ADMIN),machineController.getMachineCount);
router.put('/update/:id',auth(PLATFORM.ADMIN), machineController.updateMachine);
router.delete('/delete/:id',auth(PLATFORM.ADMIN),machineController.deleteMachine);

module.exports = router;


