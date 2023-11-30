const express = require("express");
const router = express.Router();
const SuperAdmin = require("../models/SuperAdminModel");
const Teacher = require("../models/TeacherModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post("/login", async (req, res) => {
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

    const token = jwt.sign({ id: superadmin.id }, "your-secret-key");

    res.status(200).json({ user: superadmin, token });
  } catch (error) {
    console.error("Error during superadmin login:", error);
    res.status(500).json({ error: "Superadmin login failed" });
  }
});

router.get("/teachers", async (req, res) => {
  try {
    const teachers = await Teacher.findAll();

    res.json(teachers);
  } catch (error) {
    console.error("Error during fetching list of teachers:", error);
    res.status(500).json({ error: "Fetching teachers list failed" });
  }
});

router.put("/edit/teacher/:id", async (req, res) => {
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
});

router.delete("/delete/teacher/:id", async (req, res) => {
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
});

router.post("/add-superadmin", async (req, res) => {
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

    const token = jwt.sign({ id: newSuperAdmin.id }, "your-secret-key");

    res.status(201).json({ user: newSuperAdmin, token });
  } catch (error) {
    console.error("Error during adding superadmin:", error);
    res.status(500).json({ error: "Adding superadmin failed" });
  }
});

module.exports = router;
