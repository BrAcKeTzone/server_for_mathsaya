const express = require("express");
const router = express.Router();
const custSupController = require("../controllers/custSupController");

router.get("/cust-support/list", custSupController.listEmailEntries);

router.get("/cust-support/view/:emailId", custSupController.viewEmailEntry);

module.exports = router;
