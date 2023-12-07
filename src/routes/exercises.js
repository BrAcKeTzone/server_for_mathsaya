const express = require("express");
const router = express.Router();
const exerciseControllers = require("../controllers/exercisesControllers");

router.post("/add", exerciseControllers.addExercise);

router.get("/view/:exerciseId", exerciseControllers.viewExercise);

router.put("/edit/:exerciseId", exerciseControllers.editExercise);

router.delete("/delete/:exerciseId", exerciseControllers.deleteExercise);

router.get("/exercises/:lessonId", exerciseControllers.getExercisesByLesson);

module.exports = router;
