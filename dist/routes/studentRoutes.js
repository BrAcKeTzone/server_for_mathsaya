"use strict";

var express = require("express");
var router = express.Router();
var studentsController = require("../controllers/mostUsers/studentsController");
router.post("/add", studentsController.addStudent);
router.get("/view/:studentId", studentsController.viewStudent);
router.put("/edit/:studentId", studentsController.editStudent);
router["delete"]("/delete/:studentId", studentsController.deleteStudent);
router.get("/:sectionId", studentsController.getStudentsBySection);
module.exports = router;