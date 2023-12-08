const { Op } = require("sequelize");
const Teacher = require("../models/TeacherModel");
const OTP = require("../models/ForOTPModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { sendOTPEmail } = require("../services/emailService");
require("dotenv").config();

async function signup(req, res) {
  try {
    const { email } = req.body;

    const existingTeacher = await Teacher.findOne({ where: { email } });
    if (existingTeacher) {
      return res.status(400).json({ error: "Email already exists" });
    }

    await OTP.removeExpiredEntries();

    const generatedOTP = await OTP.generateAndStoreOTP(email);

    await sendOTPEmail(email, generatedOTP);

    res.status(200).json({ message: "OTP sent to email for verification" });
  } catch (error) {
    console.error("Error during teacher signup:", error);
    res.status(500).json({ error: "Teacher signup failed" });
  }
}

async function verifyOTP(req, res) {
  try {
    const { email, otp, firstname, lastname, password, gender, schoolName } =
      req.body;

    const latestOTP = await OTP.findOne({
      where: {
        email,
        expires: { [Op.gt]: new Date() },
      },
      order: [["createdAt", "DESC"]],
    });

    if (!latestOTP || latestOTP.otp !== otp) {
      return res.status(401).json({ error: "Invalid OTP" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newTeacher = await Teacher.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      gender,
      schoolName,
    });

    await latestOTP.destroy();

    const token = jwt.sign({ id: newTeacher.id }, process.env.SECRET_KEY);

    res.status(201).json({ user: newTeacher, token });
  } catch (error) {
    console.error("Error during OTP verification:", error);
    res.status(500).json({ error: "OTP verification failed" });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const teacher = await Teacher.findOne({ where: { email } });

    if (!teacher) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, teacher.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ id: teacher.id }, process.env.SECRET_KEY);

    res.status(200).json({ user: teacher, token });
  } catch (error) {
    console.error("Error during teacher login:", error);
    res.status(500).json({ error: "Teacher login failed" });
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

async function getTeacherInfo(req, res) {
  try {
    const { id } = req.params;

    const teacher = await Teacher.findByPk(id);

    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    res.json(teacher);
  } catch (error) {
    console.error("Error during fetching teacher information:", error);
    res.status(500).json({
      error: "Fetching teacher information failed\n " + error.message,
    });
  }
}

module.exports = {
  signup,
  verifyOTP,
  login,
  editTeacher,
  getTeacherInfo,
};
