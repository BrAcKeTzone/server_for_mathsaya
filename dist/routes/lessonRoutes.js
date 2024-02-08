"use strict";

var express = require("express");
var multer = require("multer");
var router = express.Router();
var _require = require("multer-storage-cloudinary"),
  CloudinaryStorage = _require.CloudinaryStorage;
var cloudinary = require("../config/cloudinaryConfig");
var lessonsController = require("../controllers/mostUsers/lessonsController");
var storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    resource_type: "auto",
    folder: "mathsaya_uploads/lessons",
    public_id_thumbnail: function public_id_thumbnail(req, file) {
      return "lesson_".concat(Date.now(), "_").concat(file.originalname);
    },
    public_id_video: function public_id_video(req, file) {
      return "lesson_".concat(Date.now(), "_").concat(file.originalname);
    }
  },
  allowedFormats: ["jpg", "jpeg", "png", "mp4"],
  timeout: 60000 * 5
});
var upload = multer({
  storage: storage
});
router.post("/add", upload.single("lessonThumbnail"), lessonsController.addLesson);
router.put("/upload-video/:lessonId", upload.single("lessonVideo"), lessonsController.uploadVid);
router.put("/edit/:lessonId", upload.single("lessonThumbnail"), lessonsController.editLesson);
router.get("/view/:lessonId", lessonsController.viewLesson);
router["delete"]("/delete/:lessonId", lessonsController.deleteLesson);
router.get("/:yunitId", lessonsController.getLessonsByYunit);
module.exports = router;