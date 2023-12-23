const express = require("express");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinaryConfig");
const teacherController = require("../controllers/teacher/teacherController");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    resource_type: "auto",
    folder: "mathsaya_uploads/email_attachments",
    public_id: (req, file) => {
      return `email_attachment_${Date.now()}_${file.originalname}`;
    },
  },
  allowedFormats: ["jpg", "jpeg", "png", "mp4"],
  timeout: 60000 * 5,
});
const upload = multer({ storage: storage });

router.post("/signup", teacherController.signup);

router.post("/verify-otp", teacherController.verifyOTP);

router.post("/login", teacherController.login);

router.put("/edit/:id", teacherController.editTeacher);

router.get("/display/:id", teacherController.getTeacherInfo);

router.post(
  "/send-email",
  upload.single("attachment"),
  teacherController.sendEmailToAdmin
);

router.post("/change-password", teacherController.sendOTPForPasswordChange);

router.put(
  "/change-password/verify",
  teacherController.verifyOTPForPasswordChange
);

module.exports = router;
