const sequelize = require("sequelize");
const Sprofile = require("../../models/SprofileModel");
const Student = require("../../models/StudentModel");
const Yunit = require("../../models/YunitModel");
const Lesson = require("../../models/LessonModel");
const Exercise = require("../../models/ExerciseModel");
const CompletedExercise = require("../../models/CompletedExerciseModel");
const CompletedLesson = require("../../models/CompletedLessonModel");
const CompletedUnit = require("../../models/CompletedUnitModel");

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
    const formattedDate = currentDate.toISOString().split("T")[0];

    if (!studentProfile) {
      studentProfile = await Sprofile.create({
        studentId: student.studentId,
        profileId: student.profileId,
        firstLoginDate: currentDate,
        loginDates: formattedDate,
        userId: student.userId,
      });

      return res.json({
        message: "First login, profile created",
        profile: studentProfile,
      });
    } else {
      // Check if the formatted date is already present in loginDates
      if (
        !studentProfile.loginDates ||
        !studentProfile.loginDates.includes(formattedDate)
      ) {
        // Append the current login date to the existing loginDates string
        const updatedLoginDates = studentProfile.loginDates
          ? studentProfile.loginDates + "," + formattedDate
          : formattedDate;

        await studentProfile.update({
          firstLoginDate: studentProfile.firstLoginDate || currentDate,
          loginDates: updatedLoginDates,
        });

        return res.json({
          message: "Returning student, loginDates updated",
          profile: studentProfile,
        });
      } else {
        return res.json({
          message: "Returning student, login date already exists",
          profile: studentProfile,
        });
      }
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
        attributes: ["exerciseName"],
      },
    });

    const completedLessons = await CompletedLesson.findAll({
      where: { studentProfileId },
      include: {
        model: Lesson,
        attributes: ["lessonName"],
      },
    });

    const completedUnits = await CompletedUnit.findAll({
      where: { studentProfileId },
      include: {
        model: Yunit,
        attributes: ["yunitName"],
      },
    });

    const averageStarRatingPerYunit = await CompletedUnit.findAll({
      attributes: [
        "yunitId",
        [sequelize.fn("avg", sequelize.col("starRating")), "averageStarRating"],
      ],
      where: { studentProfileId },
      group: ["yunitId"],
      include: {
        model: Yunit,
        attributes: ["yunitName"],
      },
    });

    const averageStarRatingPerLesson = await CompletedLesson.findAll({
      attributes: [
        "lessonId",
        [sequelize.fn("avg", sequelize.col("starRating")), "averageStarRating"],
      ],
      where: { studentProfileId },
      group: ["lessonId"],
      include: {
        model: Lesson,
        attributes: ["lessonName"],
      },
    });

    const minExercise = await CompletedExercise.findOne({
      where: { studentProfileId },
      order: [["starRating", "ASC"]],
      include: {
        model: Exercise,
        attributes: ["exerciseName"],
      },
    });

    const maxExercise = await CompletedExercise.findOne({
      where: { studentProfileId },
      order: [["starRating", "DESC"]],
      include: {
        model: Exercise,
        attributes: ["exerciseName"],
      },
    });

    const minLesson = await CompletedLesson.findOne({
      where: { studentProfileId },
      order: [["starRating", "ASC"]],
      include: {
        model: Lesson,
        attributes: ["lessonName"],
      },
    });

    const maxLesson = await CompletedLesson.findOne({
      where: { studentProfileId },
      order: [["starRating", "DESC"]],
      include: {
        model: Lesson,
        attributes: ["lessonName"],
      },
    });

    const minYunit = await CompletedUnit.findOne({
      where: { studentProfileId },
      order: [["starRating", "ASC"]],
      include: {
        model: Yunit,
        attributes: ["yunitName"],
      },
    });

    const maxYunit = await CompletedUnit.findOne({
      where: { studentProfileId },
      order: [["starRating", "DESC"]],
      include: {
        model: Yunit,
        attributes: ["yunitName"],
      },
    });

    const studentProfileWithInfo = {
      studentProfile,
      student,
      completedExercises,
      completedLessons,
      completedUnits,
      averageStarRatingPerYunit,
      averageStarRatingPerLesson,
      minExercise,
      maxExercise,
      minLesson,
      maxLesson,
      minYunit,
      maxYunit,
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

module.exports = {
  login,
  getStudentProfileId,
  getStudentInformation,
  addCompletedExercise,
  addCompletedLesson,
  addCompletedYunit,
};
