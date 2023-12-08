const express = require("express");
const multer = require("multer");
const router = express.Router();
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinaryConfig");
const lessonsController = require("../controllers/lessonsController");

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
  timeout: 60000 * 5,
});
const upload = multer({ storage: storage });

router.post(
  "/add",
  upload.single("lessonThumbnail"),
  lessonsController.addLesson
);

router.put(
  "/upload-video/:lessonId",
  upload.single("lessonVideo"),
  lessonsController.uploadVid
);

router.put(
  "/edit/:lessonId",
  upload.single("lessonThumbnail"),
  lessonsController.editLesson
);

router.get("/view/:lessonId", lessonsController.viewLesson);

router.delete("/delete/:lessonId", lessonsController.deleteLesson);

router.get("/lessons/:yunitId", lessonsController.getLessonsByYunit);

module.exports = router;
