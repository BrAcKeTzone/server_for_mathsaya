const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const mailSender = require("../utils/mailSender");

const otpSchema = sequelize.define("OTP", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  otp: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Date.now,
    expires: 60 * 5,
  },
});
// Define a function to send emails
async function sendOTP(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "Verification Email",
      `<h1>Please confirm your OTP</h1>
            <p>Here is your OTP code: ${otp}</p>`
    );
    console.log("Email sent successfully: ", mailResponse);
  } catch (error) {
    console.error("Error sending email: ", error);
    throw error;
  }
}
otpSchema.pre("save", async function (next) {
  console.log("New document saved to the database");
  // Only send an email when a new document is created
  if (this.isNew) {
    await sendOTP(this.email, this.otp);
  }
});
module.exports = otpSchema;
