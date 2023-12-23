const express = require("express");
const router = express.Router();
const custSupController = require("../controllers/superadmin/custSupController");

router.get("/list", custSupController.listEmailEntries);

router.get("/view/:emailId", custSupController.viewEmailEntry);

router.get("/unread", custSupController.listUnreadEmailEntries);

router.get("/read", custSupController.listReadEmailEntries);

module.exports = router;
