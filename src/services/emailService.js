const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const sendOTPEmail = async (email, otp) => {
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "MathSaya Teacher Signup: Your One-Time Passcode (OTP)",
    text: `Dear Teacher,\n\nThank you for choosing MathSaya! Your One-Time Passcode (OTP) for teacher signup is: ${otp}\n\nThis OTP is only valid for 5 minutes, so please use it promptly to complete your registration.\n\nIf you have any questions or need assistance, feel free to contact our support team.\n\nBest regards,\nThe MathSaya Team`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = { sendOTPEmail };
