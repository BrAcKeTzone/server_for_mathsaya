const SuperAdmin = require("../../models/SuperAdminModel");
const Teacher = require("../../models/TeacherModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const superadmin = await SuperAdmin.findOne({ where: { email } });
    if (!superadmin) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const passwordMatch = await bcrypt.compare(password, superadmin.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign({ id: superadmin.id }, process.env.SECRET_KEY);
    res.status(200).json({ user: superadmin, token });
  } catch (error) {
    console.error("Error during superadmin login:", error);
    res.status(500).json({ error: "Superadmin login failed" });
  }
}

async function checkSuperAdminExists(req, res) {
  try {
    const { superAdminId } = req.params;
    const superadmin = await SuperAdmin.findByPk(superAdminId);
    if (!superadmin) {
      return res.status(404).json({ error: "SuperAdmin not found" });
    }
    res.json({ message: "SuperAdmin exists" });
  } catch (error) {
    console.error("Error during checking superadmin existence:", error);
    res.status(500).json({ error: "Checking superadmin existence failed" });
  }
}

async function getTeachers(req, res) {
  try {
    const teachers = await Teacher.findAll({
      order: [["lastname", "ASC"]],
    });
    res.json(teachers);
  } catch (error) {
    console.error("Error during fetching list of teachers:", error);
    res.status(500).json({ error: "Fetching teachers list failed" });
  }
}

async function getTotalTeachers(req, res) {
  try {
    const totalTeachers = await Teacher.count();
    res.json({ totalTeachers });
  } catch (error) {
    console.error("Error during fetching total number of teachers:", error);
    res.status(500).json({ error: "Fetching total teachers count failed" });
  }
}

async function editTeacher(req, res) {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const teacher = await Teacher.findByPk(id);
    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }
    if (updatedData.email && updatedData.email !== teacher.email) {
      const existingTeacher = await Teacher.findOne({
        where: { email: updatedData.email },
      });
      if (existingTeacher) {
        return res.status(400).json({ error: "Email already exists" });
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

async function deleteTeacher(req, res) {
  try {
    const { id } = req.params;
    const teacher = await Teacher.findByPk(id);
    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }
    await teacher.destroy();
    res.json({ message: "Teacher deleted successfully" });
  } catch (error) {
    console.error("Error during deleting teacher:", error);
    res.status(500).json({ error: "Deleting teacher failed" });
  }
}

async function getSuperAdmins(req, res) {
  try {
    const superadmin = await SuperAdmin.findAll({
      order: [["lastname", "ASC"]],
    });
    res.json(superadmin);
  } catch (error) {
    console.error("Error during fetching list of superadmin:", error);
    res.status(500).json({ error: "Fetching superadmin list failed" });
  }
}

async function getTotalSuperAdmins(req, res) {
  try {
    const totalSuperAdmins = await SuperAdmin.count();
    res.json({ totalSuperAdmins });
  } catch (error) {
    console.error("Error during fetching total number of superadmins:", error);
    res.status(500).json({ error: "Fetching total superadmins count failed" });
  }
}

async function addSuperAdmin(req, res) {
  try {
    const { firstname, lastname, email, password, gender } = req.body;
    const existingSuperAdmin = await SuperAdmin.findOne({ where: { email } });
    if (existingSuperAdmin) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newSuperAdmin = await SuperAdmin.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      gender,
    });
    const token = jwt.sign({ id: newSuperAdmin.id }, process.env.SECRET_KEY);
    res.status(201).json({ user: newSuperAdmin, token });
  } catch (error) {
    console.error("Error during adding superadmin:", error);
    res.status(500).json({ error: "Adding superadmin failed" });
  }
}

async function editSuperAdmin(req, res) {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const superadmin = await SuperAdmin.findByPk(id);
    if (!superadmin) {
      return res.status(404).json({ error: "SuperAdmin not found" });
    }
    if (updatedData.email && updatedData.email !== superadmin.email) {
      const existingTeacher = await SuperAdmin.findOne({
        where: { email: updatedData.email },
      });
      if (existingTeacher) {
        return res.status(400).json({ error: "Email already exists" });
      }
    }
    if (updatedData.password) {
      updatedData.password = await bcrypt.hash(updatedData.password, 10);
    }
    await superadmin.update(updatedData);
    res.json(superadmin);
  } catch (error) {
    console.error("Error during editing superadmin information:", error);
    res.status(500).json({ error: "Editing superadmin information failed" });
  }
}

async function deleteSuperAdmin(req, res) {
  try {
    const { id } = req.params;
    const superadmin = await SuperAdmin.findByPk(id);
    if (!superadmin) {
      return res.status(404).json({ error: "SuperAdmin not found" });
    }
    await superadmin.destroy();
    res.json({ message: "SuperAdmin deleted successfully" });
  } catch (error) {
    console.error("Error during deleting superadmin:", error);
    res.status(500).json({ error: "Deleting superadmin failed" });
  }
}

async function getSuperAdminById(req, res) {
  try {
    const { superAdminId } = req.params;
    const superadmin = await SuperAdmin.findByPk(superAdminId);
    if (!superadmin) {
      return res.status(404).json({ error: "SuperAdmin not found" });
    }
    res.json(superadmin);
  } catch (error) {
    console.error("Error during getting superadmin by ID:", error);
    res.status(500).json({ error: "Getting superadmin by ID failed" });
  }
}

module.exports = {
  login,
  checkSuperAdminExists,
  getTeachers,
  getTotalTeachers,
  editTeacher,
  deleteTeacher,
  getSuperAdmins,
  getTotalSuperAdmins,
  addSuperAdmin,
  editSuperAdmin,
  deleteSuperAdmin,
  getSuperAdminById,
};
