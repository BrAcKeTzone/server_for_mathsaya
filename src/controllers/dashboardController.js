const RoomSection = require("../models/RoomSectionModel");
const Student = require("../models/StudentModel");
const Sprofile = require("../models/SprofileModel");
const Exercise = require("../models/ExerciseModel");
const Yunit = require("../models/YunitModel");
const Lesson = require("../models/LessonModel");
const CompletedExercise = require("../models/CompletedExerciseModel");

async function studentCount(req, res) {
  const teacherId = req.params.teacherId;
  try {
    const sections = await RoomSection.findAll({
      where: { teacherId },
    });
    const sectionStudentCounts = [];
    for (const section of sections) {
      const sectionId = section.sectionId;
      const sectionName = section.sectionName;

      const maleCount = await Student.count({
        where: { sectionId, gender: "Male" },
      });
      const femaleCount = await Student.count({
        where: { sectionId, gender: "Female" },
      });
      const totalStudents = maleCount + femaleCount;
      const sectionInfo = {
        sectionId,
        sectionName,
        totalStudents,
        maleCount,
        femaleCount,
      };
      sectionStudentCounts.push(sectionInfo);
    }
    return res.json(sectionStudentCounts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getUnitCreatedAt(req, res) {
  const teacherId = req.params.teacherId;
  try {
    const unitsInfo = await Yunit.findAll({
      where: { teacherId },
      attributes: ["createdAt", "yunitName"],
    });
    res.json(unitsInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getLessonCreatedAt(req, res) {
  const teacherId = req.params.teacherId;

  try {
    const lessonsInfo = await Lesson.findAll({
      where: { teacherId },
      attributes: ["createdAt", "lessonName"],
    });

    res.json(lessonsInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getExerciseCreateAt(req, res) {
  const teacherId = req.params.teacherId;
  try {
    const exercisesInfo = await Exercise.findAll({
      where: { teacherId },
      attributes: ["createdAt", "exercise_name"],
    });
    res.json(exercisesInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getCompletedExerciseInfo(req, res) {
  try {
    const completedExercisesInfo = await CompletedExercise.findAll({
      include: {
        model: Exercise,
        attributes: ["exercise_name"],
      },
      attributes: ["completionTime", "exerciseId"],
    });

    return res.json(completedExercisesInfo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getFirstLoginDate(req, res) {
  const teacherId = req.params.teacherId;
  try {
    const studentProfilesInfo = await Sprofile.findAll({
      include: {
        model: Student,
        attributes: ["firstname", "lastname"],
        where: { teacherId },
      },
      attributes: ["firstLoginDate", "studentId"],
    });

    return res.json(studentProfilesInfo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  studentCount,
  getUnitCreatedAt,
  getLessonCreatedAt,
  getExerciseCreateAt,
  getCompletedExerciseInfo,
  getFirstLoginDate,
};
