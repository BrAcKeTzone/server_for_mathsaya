"use strict";

var express = require("express");
var router = express.Router();
var sprofilesContainer = require("../controllers/studentOnly/sprofilesController");
router.post("/login", sprofilesContainer.login);
router.get("/get-profile-id/:studentId", sprofilesContainer.getStudentProfileId);
router.get("/student-profile/:studentProfileId", sprofilesContainer.getStudentInformation);
router.post("/add-completed-exercise", sprofilesContainer.addCompletedExercise);
router.post("/add-completed-lesson", sprofilesContainer.addCompletedLesson);
router.post("/add-completed-yunit", sprofilesContainer.addCompletedYunit);
module.exports = router;