const Sprofile = require("../models/SprofileModel");
const Student = require("../models/StudentModel");
const Yunit = require("../models/YunitModel");
const Lesson = require("../models/LessonModel");
const Exercise = require("../models/ExerciseModel");
const CompletedExercise = require("../models/CompletedExerciseModel");
const CompletedLesson = require("../models/CompletedLessonModel");
const CompletedUnit = require("../models/CompletedUnitModel");

async function login(req, res) {
  const { firstname, lastname, username } = req.body;
  try {
    const student = await Student.findOne({
      where: { firstname, lastname, username },
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    let studentProfile = await Sprofile.findOne({
      where: { studentId: student.studentId },
    });

    const currentDate = new Date();

    if (!studentProfile) {
      studentProfile = await Sprofile.create({
        studentId: student.studentId,
        profileId: student.profileId,
        firstLoginDate: currentDate,
        teacherId: student.teacherId,
        loginDates: [currentDate],
      });

      return res.json({
        message: "First login, profile created",
        profile: studentProfile,
      });
    } else if (!studentProfile.firstLoginDate) {
      await studentProfile.update({
        firstLoginDate: currentDate,
        loginDates: [currentDate],
      });

      return res.json({
        message: "Returning student, firstLoginDate updated",
        profile: studentProfile,
      });
    } else {
      await studentProfile.update({
        loginDates: [...studentProfile.loginDates, currentDate],
      });
      return res.json({
        message: "Returning student, firstLoginDate is already set",
        profile: studentProfile,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getStudentProfileId(req, res) {
  const studentId = req.params.studentId;

  try {
    const student = await Student.findByPk(studentId);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (!student.profileId) {
      return res
        .status(404)
        .json({ message: "Profile not found for the student" });
    }

    return res.json({ studentProfileId: student.profileId });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getStudentInformation(req, res) {
  const studentProfileId = req.params.studentProfileId;

  try {
    const studentProfile = await Sprofile.findOne({
      where: { profileId: studentProfileId },
    });

    if (!studentProfile) {
      return res.status(404).json({ message: "Student profile not found" });
    }

    const student = await Student.findOne({
      where: { studentId: studentProfile.studentId },
    });

    const completedExercises = await CompletedExercise.findAll({
      where: { studentProfileId },
      include: {
        model: Exercise,
        attributes: ["exerciseTitle"],
      },
    });

    const completedLessons = await CompletedLesson.findAll({
      where: { studentProfileId },
      include: {
        model: Lesson,
        attributes: ["lessonTitle"],
      },
    });

    const completedUnits = await CompletedUnit.findAll({
      where: { studentProfileId },
      include: {
        model: Yunit,
        attributes: ["yunitTitle"],
      },
    });

    const studentProfileWithInfo = {
      studentProfile,
      student,
      completedExercises,
      completedLessons,
      completedUnits,
    };

    return res.json(studentProfileWithInfo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function addCompletedExercise(req, res) {
  try {
    const { exerciseId, starRating, studentProfileId } = req.body;

    const completionTime = new Date();

    const existingEntry = await CompletedExercise.findOne({
      where: { exerciseId, studentProfileId },
    });

    if (existingEntry) {
      await existingEntry.update({ starRating, completionTime });
      return res.json(existingEntry);
    }

    const completedExercise = await CompletedExercise.create({
      exerciseId,
      starRating,
      completionTime: completionTime,
      studentProfileId,
    });

    return res.json(completedExercise);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function addCompletedLesson(req, res) {
  const { lessonId, studentProfileId } = req.body;
  try {
    const existingEntry = await CompletedLesson.findOne({
      where: {
        lessonId,
        studentProfileId,
      },
    });

    const totalStarRating = await CompletedExercise.sum("starRating", {
      where: {
        studentProfileId,
      },
      include: {
        model: Exercise,
        where: {
          lessonId,
        },
      },
    });

    if (existingEntry) {
      await existingEntry.update({ starRating: totalStarRating });
      return res.json(existingEntry);
    } else {
      const completedLesson = await CompletedLesson.create({
        lessonId,
        starRating: totalStarRating,
        studentProfileId,
      });
      return res.json(completedLesson);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function addCompletedYunit(req, res) {
  const { yunitId, studentProfileId } = req.body;
  try {
    const existingEntry = await CompletedUnit.findOne({
      where: {
        yunitId,
        studentProfileId,
      },
    });

    const totalStarRating = await CompletedLesson.sum("starRating", {
      where: {
        studentProfileId,
      },
      include: {
        model: Lesson,
        where: {
          yunitId,
        },
      },
    });

    if (existingEntry) {
      await existingEntry.update({ starRating: totalStarRating });
      return res.json(existingEntry);
    } else {
      const completedUnit = await CompletedUnit.create({
        yunitId,
        starRating: totalStarRating,
        studentProfileId,
      });
      return res.json(completedUnit);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getMinRatings(req, res) {
  const studentProfileId = req.params.studentProfileId;
  try {
    const minExercise = await CompletedExercise.findOne({
      where: { studentProfileId },
      order: [["starRating", "ASC"]],
      include: {
        model: Exercise,
        attributes: ["exerciseTitle"],
      },
    });

    const minLesson = await CompletedLesson.findOne({
      where: { studentProfileId },
      order: [["starRating", "ASC"]],
      include: {
        model: Lesson,
        attributes: ["lessonTitle"],
      },
    });

    const minYunit = await CompletedUnit.findOne({
      where: { studentProfileId },
      order: [["starRating", "ASC"]],
      include: {
        model: Yunit,
        attributes: ["yunitTitle"],
      },
    });

    return res.json({
      minExercise,
      minLesson,
      minYunit,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  login,
  getStudentProfileId,
  getStudentInformation,
  addCompletedExercise,
  addCompletedLesson,
  addCompletedYunit,
  getMinRatings,
};
