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
    subject: "MathSaya Service: Your One-Time Passcode (OTP)",
    html: `
    <html>
      <body style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Welcome to MathSaya, Teacher!</h2>
        <p>Thank you for choosing MathSaya! Your One-Time Passcode (OTP) is:</p>
        <h3 style="background-color: #f5f5f5; padding: 10px; border-radius: 5px;">${otp}</h3>
        <p>This OTP is only valid for 5 minutes, so please use it promptly to complete your action.</p>
        <p>If you have any questions or need assistance, feel free to contact our support team.</p>
        <p>Best regards,<br/>The MathSaya Team</p>
        <p style="color: #888; font-size: 12px;background-color: #f5f5f5;padding:5px; text-align: center">This is a system-generated email. Please do not reply.</p>
      </body>
    </html>
  `,
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
