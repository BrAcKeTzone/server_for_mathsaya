const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");

router.get("/student-count/:teacherId", dashboardController.studentCount);

router.get("/unit-created-at/:teacherId", dashboardController.getUnitCreatedAt);

router.get(
  "/lesson-created-at/:teacherId",
  dashboardController.getLessonCreatedAt
);

router.get(
  "/exercise-created-at/:teacherId",
  dashboardController.getExerciseCreateAt
);

router.get(
  "/completed-exercises-info",
  dashboardController.getCompletedExerciseInfo
);

router.get(
  "/student-profiles-info/:teacherId",
  dashboardController.getFirstLoginDate
);

module.exports = router;
