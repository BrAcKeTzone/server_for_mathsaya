const express = require("express");
const router = express.Router();
const exerciseController = require("../controllers/mostUsers/exercisesController");

router.post("/add", exerciseController.addExercise);

router.get("/view/:exerciseId", exerciseController.viewExercise);

router.put("/edit/:exerciseId", exerciseController.editExercise);

router.delete("/delete/:exerciseId", exerciseController.deleteExercise);

router.get("/:lessonId", exerciseController.getExercisesByLesson);

module.exports = router;
