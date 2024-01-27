require("dotenv").config();
const { Op } = require("sequelize");
const User = require("../../models/UserModel");
const OTP = require("../../models/ForOTPModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { sendOTPEmail } = require("../../services/emailService");
const {
  checkUserPermission,
} = require("../../middlewares/checkUserPermission");

async function signup(req, res) {
  try {
    const { email } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    await OTP.removeExpiredEntries();

    const generatedOTP = await OTP.generateAndStoreOTP(email);

    await sendOTPEmail(email, generatedOTP);

    res.status(200).json({ message: "OTP sent to email for verification" });
  } catch (error) {
    console.error("Error during user signup:", error);
    res.status(500).json({ error: "User signup failed" });
  }
}

async function forgotPassword(req, res) {
  try {
    const { email } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (!existingUser) {
      return res.status(400).json({ error: "Email does not exist" });
    }

    await OTP.removeExpiredEntries();

    const generatedOTP = await OTP.generateAndStoreOTP(email);

    await sendOTPEmail(email, generatedOTP);

    res.status(200).json({ message: "OTP sent to email for password reset" });
  } catch (error) {
    console.error("Error during forgot password:", error);
    res.status(500).json({ error: "Forgot password failed" });
  }
}

async function verifyForgotPassword(req, res) {
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

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.update({ password: hashedPassword }, { where: { email } });

    await latestOTP.destroy();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error during forgot password verification:", error);
    res.status(500).json({ error: "Forgot password verification failed" });
  }
}

async function changeEmail(req, res) {
  try {
    const { userId, newEmail } = req.body;
    if (!(await checkUserPermission(userId, res))) {
      return;
    }

    const userWithEmail = await User.findOne({ where: { email: newEmail } });
    if (userWithEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }

    await OTP.removeExpiredEntries();

    const generatedOTP = await OTP.generateAndStoreOTP(newEmail);

    await sendOTPEmail(newEmail, generatedOTP);

    res.status(200).json({ message: "OTP sent to new email for verification" });
  } catch (error) {
    console.error("Error during email change:", error);
    res.status(500).json({ error: "Email change failed" });
  }
}

async function verifyEmailChange(req, res) {
  try {
    const { userId, newEmail, otp, currentPassword } = req.body;
    if (!(await checkUserPermission(userId, res))) {
      return;
    }
    const existingEmail = await User.findOne({ where: { email: newEmail } });
    if (existingEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const latestOTP = await OTP.findOne({
      where: {
        email: newEmail,
        expires: { [Op.gt]: new Date() },
      },
      order: [["createdAt", "DESC"]],
    });
    if (!latestOTP || latestOTP.otp !== otp) {
      return res.status(401).json({ error: "Invalid OTP" });
    }
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const passwordMatch = await bcrypt.compare(currentPassword, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }
    await user.update({ email: newEmail }, { where: { UserId: userId } });
    await latestOTP.destroy();
    res.status(200).json({ message: "Email updated successfully" });
  } catch (error) {
    console.error("Error during email change verification:", error);
    res.status(500).json({ error: "Email change verification failed" });
  }
}

async function changePassword(req, res) {
  try {
    const { userId, email, currentPassword } = req.body;
    if (!(await checkUserPermission(userId, res))) {
      return;
    }
    const teacher = await User.findOne({ where: { email } });
    if (!teacher) {
      return res.status(404).json({ error: "User not found" });
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

async function verifyChangePassword(req, res) {
  try {
    const { userId, email, otp, newPassword } = req.body;
    if (!(await checkUserPermission(userId, res))) {
      return;
    }
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
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "Teacher not found" });
    }
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await user.update({ password: hashedNewPassword });
    await latestOTP.destroy();
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error during OTP verification for password change:", error);
    res.status(500).json({ error: "OTP verification failed" });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);

    res.status(200).json({ user: user, token });
  } catch (error) {
    console.error("Error during user login:", error);
    res.status(500).json({ error: "User login failed" });
  }
}

async function getCurrentUser(req, res) {
  try {
    const { userId } = req.params;
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

module.exports = {
  signup,
  forgotPassword,
  verifyForgotPassword,
  changeEmail,
  verifyEmailChange,
  changePassword,
  verifyChangePassword,
  login,
  getCurrentUser,
};
