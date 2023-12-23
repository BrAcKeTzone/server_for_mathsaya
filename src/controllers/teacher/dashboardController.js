// controllers/dashboardController.js
const RoomSection = require("../../models/RoomSectionModel");
const Student = require("../../models/StudentModel");
const Yunit = require("../../models/YunitModel");
const Lesson = require("../../models/LessonModel");
const Exercise = require("../../models/ExerciseModel");

async function getDashboardStats(req, res) {
  try {
    const { teacherId } = req.params;

    const totalSections = await RoomSection.count({
      where: { teacherId },
    });

    const totalStudents = await Student.count({
      where: { teacherId },
    });

    const totalYunits = await Yunit.count({
      where: { teacherId },
    });

    const totalLessons = await Lesson.count({
      where: { teacherId },
    });

    const totalExercises = await Exercise.count({
      where: { teacherId },
    });

    const dashboardStats = {
      totalSections,
      totalStudents,
      totalYunits,
      totalLessons,
      totalExercises,
    };

    res.json(dashboardStats);
  } catch (error) {
    console.error("Error getting dashboard stats:", error);
    res.status(500).json({ error: "Failed to get dashboard stats" });
  }
}

module.exports = {
  getDashboardStats,
};
