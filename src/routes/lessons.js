const express = require("express");
const multer = require("multer");
const router = express.Router();
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinaryConfig");
const lessonsController = require("../controllers/lessonsController");

// Define storage for uploaded files using Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    resource_type: "auto",
    folder: "mathsaya_uploads/lessons",
    public_id_thumbnail: (req, file) => {
      return `lesson_${Date.now()}_${file.originalname}`;
    },
    public_id_video: (req, file) => {
      return `lesson_${Date.now()}_${file.originalname}`;
    },
  },
  allowedFormats: ["jpg", "jpeg", "png", "mp4"],
  timeout: 120000, // in milliseconds
});
const upload = multer({ storage: storage });

// Route for adding lesson entry
router.post(
  "/add",
  upload.single("lessonThumbnail"),
  lessonsController.addLesson
);

// Route for uploading a video for a specific lesson
router.put(
  "/upload-video/:lessonId",
  upload.single("lessonVideo"),
  lessonsController.uploadVid
);

// Route for editing (updating) a Lesson by ID with image replacement
router.put(
  "/edit/:lessonId",
  upload.single("lessonThumbnail"),
  lessonsController.editLesson
);

// Route for viewing a Lesson by yunit ID
router.get("/view/:lessonId", lessonsController.viewLesson);

// Route for deleting a Lesson by ID along with associated files
router.delete("/delete/:lessonId", lessonsController.deleteLesson);

// Route to get all Lessons for a specific Yunit
router.get("/lessons/:yunitId", lessonsController.getLessonsByYunit);

module.exports = router;
