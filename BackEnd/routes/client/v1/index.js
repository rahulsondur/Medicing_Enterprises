/** 
* index.js
* @discription :: index route file for userapp platform
*/

const express = require("express");
const router = express.Router();

router.use('/client/auth', require("./auth"));
router.use('/client/user',require('./userRoutes'));
router.use('/client/machine',require('./machineRoutes'));


module.exports = router;