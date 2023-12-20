const express = require("express");
const router = express.Router();
const Student = require("../models/StudentModel");
const Sprofile = require("../models/SprofileModel");
const Teacher = require("../models/TeacherModel");
const Yunits = require("../models/YunitModel");
const Lessons = require("../models/LessonModel");
const Exercises = require("../models/ExerciseModel");

// Reset the Student and Sprofile models
router.post("/reset", async (req, res) => {
  try {
    // await Student.destroy({ where: {} });
    // await Sprofile.destroy({ where: {} });
    await Yunits.destroy({ where: {} });
    await Lessons.destroy({ where: {} });
    await Exercises.destroy({ where: {} });

    res.status(200).json({ message: "Models reset successfully" });
  } catch (error) {
    console.error("Error resetting models:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
