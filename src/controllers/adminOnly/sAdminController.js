const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

const User = require("../../models/UserModel");
const EmailToAdmin = require("../../models/EmailToAdminModel");
const cloudinary = require("../../config/cloudinaryConfig");
const {
  checkAdminPermission,
} = require("../../middlewares/checkAdminPermission");
const {
  checkUserPermission,
} = require("../../middlewares/checkUserPermission");
require("dotenv").config();

async function getTeachers(req, res) {
  try {
    const { userId } = req.params;
    if (!(await checkAdminPermission(userId, res))) {
      return;
    }

    const { searchTerm } = req.query;

    let teachers;
    if (searchTerm) {
      teachers = await User.findAll({
        attributes: [
          "UserId",
          "firstname",
          "lastname",
          "email",
          "gender",
          "schoolName",
        ],
        where: {
          roleType: "Teacher",
          [Op.or]: [
            { firstname: { [Op.like]: `%${searchTerm}%` } },
            { lastname: { [Op.like]: `%${searchTerm}%` } },
            { gender: { [Op.like]: `%${searchTerm}%` } },
          ],
        },
        order: [["lastname", "ASC"]],
      });
    } else {
      // Pagination parameters
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 10; // Default page size is 10

      const offset = (page - 1) * pageSize;

      teachers = await User.findAndCountAll({
        attributes: [
          "UserId",
          "firstname",
          "lastname",
          "email",
          "gender",
          "schoolName",
        ],
        where: { roleType: "Teacher" },
        order: [["lastname", "ASC"]],
        offset,
        limit: pageSize,
      });
    }

    res.json({
      totalCount: teachers.length,
      teachers,
    });
  } catch (error) {
    console.error("Error during fetching list of teachers:", error);
    res.status(500).json({ error: "Fetching teachers list failed" });
  }
}

async function getAdmins(req, res) {
  try {
    const { userId } = req.params;
    if (!(await checkAdminPermission(userId, res))) {
      return;
    }

    const { searchTerm } = req.query;

    let admins;
    if (searchTerm) {
      admins = await User.findAll({
        attributes: [
          "UserId",
          "firstname",
          "lastname",
          "email",
          "gender",
          "schoolName",
        ],
        where: {
          roleType: "Admin",
          [Op.or]: [
            { firstname: { [Op.like]: `%${searchTerm}%` } },
            { lastname: { [Op.like]: `%${searchTerm}%` } },
            { gender: { [Op.like]: `%${searchTerm}%` } },
          ],
        },
        order: [["lastname", "ASC"]],
      });
    } else {
      // Pagination parameters
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 10; // Default page size is 10

      const offset = (page - 1) * pageSize;

      admins = await User.findAndCountAll({
        attributes: [
          "UserId",
          "firstname",
          "lastname",
          "email",
          "gender",
          "schoolName",
        ],
        where: { roleType: "Admin" },
        order: [["lastname", "ASC"]],
        offset,
        limit: pageSize,
      });
    }

    res.json({
      totalCount: admins.length,
      admins,
    });
  } catch (error) {
    console.error("Error during fetching list of admins:", error);
    res.status(500).json({ error: "Fetching admins list failed" });
  }
}

async function inboxUnreadEntries(req, res) {
  try {
    const { userId } = req.params;
    if (!(await checkUserPermission(userId, res))) {
      return;
    }
    const inboxUnreadEntries = await EmailToAdmin.findAll({
      where: { status: false },
      attributes: ["emailId", "teacherEmail", "subject", "createdAt", "status"],
      order: [["createdAt", "DESC"]],
    });
    const unreadCount = await EmailToAdmin.count();
    res.json({ unreadCount, inboxUnreadEntries });
  } catch (error) {
    console.error("Error while fetching unread inbox entries:", error);
    res.status(500).json({ error: "Failed to fetch unread inbox entries" });
  }
}

async function inboxReadEntries(req, res) {
  try {
    const { userId } = req.params;
    if (!(await checkUserPermission(userId, res))) {
      return;
    }
    const inboxReadEntries = await EmailToAdmin.findAll({
      where: { status: true },
      attributes: ["emailId", "teacherEmail", "subject", "createdAt", "status"],
      order: [["createdAt", "DESC"]],
    });
    const readCount = await EmailToAdmin.count();
    res.json({ readCount, inboxReadEntries });
  } catch (error) {
    console.error("Error while fetching read inbox entries:", error);
    res.status(500).json({ error: "Failed to fetch read inbox entries" });
  }
}

async function inboxAllEntries(req, res) {
  try {
    const { userId } = req.params;
    if (!(await checkUserPermission(userId, res))) {
      return;
    }
    const inboxAllEntries = await EmailToAdmin.findAll({
      attributes: ["emailId", "teacherEmail", "subject", "createdAt", "status"],
      order: [
        ["createdAt", "DESC"],
        ["status", "ASC"],
      ],
    });
    const AllCount = await EmailToAdmin.count();
    res.json({ AllCount, inboxAllEntries });
  } catch (error) {
    console.error("Error while fetching inbox entries:", error);
    res.status(500).json({ error: "Failed to fetch inbox entries" });
  }
}

async function viewInboxEntry(req, res) {
  try {
    const { userId } = req.params;

    if (!(await checkAdminPermission(userId, res))) {
      return;
    }
    const { emailId } = req.params;

    const inboxEntry = await EmailToAdmin.findOne({
      where: { emailId },
      attributes: [
        "emailId",
        "teacherEmail",
        "subject",
        "content",
        "createdAt",
        "status",
        "attachment",
        "public_id",
      ],
    });
    if (!inboxEntry) {
      return res.status(404).json({ error: "Inbox entry not found" });
    }

    if (!inboxEntry.status) {
      await inboxEntry.update({ status: true });
    }

    res.json(inboxEntry);
  } catch (error) {
    console.error("Error while viewing inbox entry:", error);
    res.status(500).json({ error: "Failed to view inbox entry" });
  }
}

async function deleteInboxEntry(req, res) {
  try {
    const { userId } = req.params;
    if (!(await checkAdminPermission(userId, res))) {
      return;
    }
    const { emailId } = req.params;
    const inboxEntry = await EmailToAdmin.findByPk(emailId, {
      attributes: ["emailId", "attachment", "public_id"],
    });
    if (!inboxEntry) {
      res.status(404).json({ error: "Inbox entry not found" });
      return;
    }
    const deletedCount = await EmailToAdmin.destroy({ where: { emailId } });
    if (deletedCount === 0) {
      res.status(404).json({ error: "Inbox entry not found" });
    } else {
      if (inboxEntry.attachment && inboxEntry.public_id) {
        await cloudinary.uploader.destroy(inboxEntry.public_id);
      }
      res.status(204).send();
    }
  } catch (error) {
    console.error("Error during inbox entry deletion:", error);
    res.status(500).json({ error: "inbox entry deletion failed" });
  }
}

async function getAdminInfo(req, res) {
  try {
    const { userId } = req.params;
    if (!(await checkAdminPermission(userId, res))) {
      return;
    }
    const admin = await User.findByPk(userId);
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }
    res.json(admin);
  } catch (error) {
    console.error("Error during getting admin by ID:", error);
    res.status(500).json({ error: "Getting admin by ID failed" });
  }
}

async function editAdminInfo(req, res) {
  // can't edit email and password
  try {
    const { userId } = req.params;
    if (!(await checkAdminPermission(userId, res))) {
      return;
    }
    const { currentPassword, ...updatedData } = req.body;
    const admin = await User.findByPk(userId);
    if (!admin) {
      return res.status(404).json({ error: "User not found" });
    }
    if (currentPassword) {
      const passwordMatch = await bcrypt.compare(
        currentPassword,
        admin.password
      );
      if (!passwordMatch) {
        return res.status(401).json({ error: "Incorrect current password" });
      }
    }
    if (updatedData.password) {
      updatedData.password = await bcrypt.hash(updatedData.password, 10);
    }
    await admin.update(updatedData);
    res.json(admin);
  } catch (error) {
    console.error("Error during editing admin information:", error);
    res.status(500).json({ error: "Editing admin information failed" });
  }
}

async function deleteAdmin(req, res) {
  try {
    const { userId } = req.params;
    if (!(await checkAdminPermission(userId, res))) {
      return;
    }
    const admin = await User.findByPk(userId);
    if (!admin) {
      return res.status(404).json({ error: "User not found" });
    }
    await admin.destroy();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error during deleting admin:", error);
    res.status(500).json({ error: "Deleting admin failed" });
  }
}

async function deleteTeacher(req, res) {
  try {
    const { userId } = req.params;
    const teacher = await User.findByPk(userId);
    if (!teacher) {
      return res.status(404).json({ error: "User not found" });
    }
    await teacher.destroy();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error during deleting teacher:", error);
    res.status(500).json({ error: "Deleting teacher failed" });
  }
}

async function editTeacherInfo(req, res) {
  // can't edit email and password
  try {
    const { userId } = req.params;
    const { ...updatedData } = req.body;
    const teacher = await User.findByPk(userId);
    if (!teacher) {
      return res.status(404).json({ error: "User not found" });
    }
    await teacher.update(updatedData);
    res.json(teacher);
  } catch (error) {
    console.error("Error during editing teacher information:", error);
    res.status(500).json({ error: "Editing teacher information failed" });
  }
}

module.exports = {
  getTeachers,
  getAdmins,
  inboxUnreadEntries,
  inboxAllEntries,
  inboxReadEntries,
  viewInboxEntry,
  deleteInboxEntry,
  getAdminInfo,
  editAdminInfo,
  deleteAdmin,
  deleteTeacher,
  editTeacherInfo,
};
