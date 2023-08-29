/** 
* index.js
* @discription :: index route file for userapp platform
*/

const express = require("express");
const router = express.Router();

router.use('/operator/auth', require("./auth"));
router.use('/operator/user',require('./userRoutes'));
router.use('/operator/machine',require('./machineRoutes'));


module.exports = router;