const express = require("express");
const multer = require("multer");
const router = express.Router();
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinaryConfig");
const questionsController = require("../controllers/mostUsers/questionsController");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    resource_type: "image",
    folder: "mathsaya_uploads/questions",
    public_id: (req, file) => {
      return `lesson_${Date.now()}_${file.originalname}`;
    },
  },
  allowedFormats: ["jpg", "jpeg", "png"],
  timeout: 60000 * 5,
});
const upload = multer({ storage: storage });

router.post(
  "/add",
  upload.single("questionImage"),
  questionsController.addQuestion
);

router.get("/view/:questionId", questionsController.viewQuestion);

router.put(
  "/edit/:questionId",
  upload.single("questionImage"),
  questionsController.editQuestion
);

router.delete("/delete/:questionId", questionsController.deleteQuestion);

router.get("/:exerciseId", questionsController.getQuestionsByExercise);

module.exports = router;
