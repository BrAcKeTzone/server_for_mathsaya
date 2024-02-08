"use strict";

var express = require("express");
var multer = require("multer");
var router = express.Router();
var _require = require("multer-storage-cloudinary"),
  CloudinaryStorage = _require.CloudinaryStorage;
var cloudinary = require("../config/cloudinaryConfig");
var yunitsController = require("../controllers/mostUsers/yunitsController");
var storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    resource_type: "image",
    folder: "mathsaya_uploads/yunits",
    public_id: function public_id(req, file) {
      return "yunit_".concat(Date.now(), "_").concat(file.originalname);
    }
  },
  allowedFormats: ["jpg", "jpeg", "png"],
  timeout: 60000 * 5
});
var upload = multer({
  storage: storage
});
router.post("/add", upload.single("yunitThumbnail"), yunitsController.addYunit);
router.get("/view/:yunitId", yunitsController.viewYunit);
router.put("/edit/:yunitId", upload.single("yunitThumbnail"), yunitsController.editYunit);
router["delete"]("/delete/:yunitId", yunitsController.deleteYunit);
router.get("/:userId", yunitsController.getYunitsByTeacher);
module.exports = router;