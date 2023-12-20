const express = require("express");
const router = express.Router();
const sprofilesContainer = require("../controllers/sprofilesController");

router.post("/login", sprofilesContainer.login);

router.get(
  "/get-student-profile/:studentId",
  sprofilesContainer.getStudentProfileId
);

router.get(
  "/student-profile/:studentProfileId",
  sprofilesContainer.getStudentInformation
);

router.post("/add-completed-exercise", sprofilesContainer.addCompletedExercise);

router.post("/add-completed-lesson", sprofilesContainer.addCompletedLesson);

router.post("/add-completed-yunit", sprofilesContainer.addCompletedYunit);

module.exports = router;
