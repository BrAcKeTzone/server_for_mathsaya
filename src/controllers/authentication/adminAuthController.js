const { Op } = require("sequelize");
const User = require("../../models/UserModel");
const OTP = require("../../models/ForOTPModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

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

    const newUser = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      gender,
      schoolName,
      roleType: "Admin",
    });

    await latestOTP.destroy();

    const token = jwt.sign({ id: newUser.id }, process.env.SECRET_KEY);

    res.status(201).json({ admin: newUser, token });
  } catch (error) {
    console.error("Error during OTP verification:", error);
    res.status(500).json({ error: "OTP verification failed" });
  }
}

module.exports = {
  verifyOTP,
};
