const { Op } = require("sequelize");
const Teacher = require("../../models/TeacherModel");
const OTP = require("../../models/ForOTPModel");
const EmailToAdmin = require("../../models/EmailToAdminModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { sendOTPEmail } = require("../../services/emailService");
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

async function checkTeacherExists(req, res) {
  try {
    const { id } = req.params;
    const teacher = await Teacher.findByPk(id);
    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }
    res.json({ message: "Teacher exists" });
  } catch (error) {
    console.error("Error during checking teacher existence:", error);
    res.status(500).json({ error: "Checking teacher existence failed" });
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

    if (updatedData.password) {
      const passwordMatch = await bcrypt.compare(
        updatedData.currentPassword,
        teacher.password
      );

      if (!passwordMatch) {
        return res.status(401).json({ error: "Incorrect password" });
      }

      delete updatedData.password;
      delete updatedData.currentPassword;
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

async function sendEmailToAdmin(req, res) {
  try {
    console.log("req.file:", req.file);

    const { teacherId, subject, content, attachment } = req.body;

    const teacher = await Teacher.findByPk(teacherId);
    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    const newEmailData = {
      teacherId,
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

async function sendOTPForPasswordChange(req, res) {
  try {
    const { email, currentPassword } = req.body;

    const teacher = await Teacher.findOne({ where: { email } });

    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    const passwordMatch = await bcrypt.compare(
      currentPassword,
      teacher.password
    );

    if (!passwordMatch) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    await OTP.removeExpiredEntries(email);

    const generatedOTP = await OTP.generateAndStoreOTP(email);

    await sendOTPEmail(email, generatedOTP);

    res.status(200).json({ message: "OTP sent to email for verification" });
  } catch (error) {
    console.error("Error during OTP generation for password change:", error);
    res.status(500).json({ error: "OTP generation failed" });
  }
}

async function verifyOTPForPasswordChange(req, res) {
  try {
    const { email, otp, newPassword } = req.body;

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

    const teacher = await Teacher.findOne({ where: { email } });

    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await teacher.update({ password: hashedNewPassword });

    await latestOTP.destroy();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error during OTP verification for password change:", error);
    res.status(500).json({ error: "OTP verification failed" });
  }
}

module.exports = {
  signup,
  verifyOTP,
  login,
  checkTeacherExists,
  editTeacher,
  getTeacherInfo,
  sendEmailToAdmin,
  sendOTPForPasswordChange,
  verifyOTPForPasswordChange,
};
