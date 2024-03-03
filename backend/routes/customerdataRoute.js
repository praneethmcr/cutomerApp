const express = require("express");
const router = express.Router();

const customerdataController = require("../controller/customerdataController");

router.get('/data', customerdataController.getCustomers);
router.post('/insert',customerdataController.createCustomer);

module.exports = router;