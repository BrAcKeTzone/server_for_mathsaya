const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/teacher/dashboardController");

router.get("/:teacherId", dashboardController.getDashboardStats);

module.exports = router;
