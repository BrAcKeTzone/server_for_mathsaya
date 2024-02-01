const User = require("../../models/UserModel");
const EmailToAdmin = require("../../models/EmailToAdminModel");
const RoomSection = require("../../models/RoomSectionModel");
const Student = require("../../models/StudentModel");
const Yunit = require("../../models/YunitModel");
const Lesson = require("../../models/LessonModel");
const Exercise = require("../../models/ExerciseModel");
const {
  checkUserPermission,
} = require("../../middlewares/checkUserPermission");
const {
  checkTeacherPermission,
} = require("../../middlewares/checkTeacherPermission");
const bcrypt = require("bcryptjs");
require("dotenv").config();

async function getTeacherInfo(req, res) {
  try {
    const { userId } = req.params;
    if (!(await checkUserPermission(userId, res))) {
      return;
    }
    const teacher = await User.findByPk(userId);
    if (!teacher) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(teacher);
  } catch (error) {
    console.error("Error during getting admin by ID:", error);
    res.status(500).json({ error: "Getting admin by ID failed" });
  }
}

async function editTeacherInfo(req, res) {
  // can't edit roleType, email and password
  try {
    const { userId } = req.body;
    if (!(await checkTeacherPermission(userId, res))) {
      return;
    }
    const { currentPassword, ...updatedData } = req.body;
    const teacher = await User.findByPk(userId);
    if (!teacher) {
      return res.status(404).json({ error: "User not found" });
    }
    if (currentPassword) {
      const passwordMatch = await bcrypt.compare(
        currentPassword,
        teacher.password
      );
      if (!passwordMatch) {
        return res.status(401).json({ error: "Incorrect current password" });
      }
    }
    if (updatedData.password) {
      updatedData.password = await bcrypt.hash(updatedData.password, 10);
    }
    await teacher.update(updatedData);
    res.json(teacher);
  } catch (error) {
    console.error("Error during editing teacher information:", error);
    res.status(500).json({ error: "Editing teacher information failed" });
  }
}

async function messageToAdmin(req, res) {
  try {
    const { userId } = req.params;
    if (!(await checkUserPermission(userId, res))) {
      return;
    }
    console.log("req.file:", req.file);
    const { subject, content, attachment } = req.body;
    const teacher = await User.findByPk(userId);
    if (!teacher) {
      return res.status(404).json({ error: "User not found" });
    }
    const newEmailData = {
      teacherEmail: teacher.email,
      subject,
      content,
      attachment,
    };
    if (req.file) {
      newEmailData.attachment = req.file.path;
      newEmailData.public_id = req.file.filename;
    }
    const newEmail = await EmailToAdmin.create(newEmailData);
    res.status(201).json({ message: "Email sent to admin", email: newEmail });
  } catch (error) {
    console.error("Error during sending email to admin:", error);
    res.status(500).json({ error: "Sending email to admin failed" });
  }
}

async function getDashboardStats(req, res) {
  try {
    const { userId } = req.params;
    const totalSections = await RoomSection.count({
      where: { userId },
    });
    const totalStudents = await Student.count({
      where: { userId },
    });
    const totalYunits = await Yunit.count({
      where: { userId },
    });
    const totalLessons = await Lesson.count({
      where: { userId },
    });
    const totalExercises = await Exercise.count({
      where: { userId },
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
  getTeacherInfo,
  editTeacherInfo,
  messageToAdmin,
  getDashboardStats,
};
