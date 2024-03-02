const express = require("express");
const router = express.Router();

const customerdataController = require("../controller/customerdataController");

router.get('/data', customerdataController.getCustomers);

module.exports = router;