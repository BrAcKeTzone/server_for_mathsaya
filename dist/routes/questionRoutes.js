"use strict";

var express = require("express");
var multer = require("multer");
var router = express.Router();
var _require = require("multer-storage-cloudinary"),
  CloudinaryStorage = _require.CloudinaryStorage;
var cloudinary = require("../config/cloudinaryConfig");
var questionsController = require("../controllers/mostUsers/questionsController");
var storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    resource_type: "image",
    folder: "mathsaya_uploads/questions",
    public_id: function public_id(req, file) {
      return "lesson_".concat(Date.now(), "_").concat(file.originalname);
    }
  },
  allowedFormats: ["jpg", "jpeg", "png"],
  timeout: 60000 * 5
});
var upload = multer({
  storage: storage
});
router.post("/add", upload.single("questionImage"), questionsController.addQuestion);
router.get("/view/:questionId", questionsController.viewQuestion);
router.put("/edit/:questionId", upload.single("questionImage"), questionsController.editQuestion);
router["delete"]("/delete/:questionId", questionsController.deleteQuestion);
router.get("/:exerciseId", questionsController.getQuestionsByExercise);
module.exports = router;