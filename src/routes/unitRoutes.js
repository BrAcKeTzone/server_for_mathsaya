const express = require("express");
const multer = require("multer");
const router = express.Router();
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinaryConfig");
const yunitsController = require("../controllers/mostUsers/yunitsController");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    resource_type: "image",
    folder: "mathsaya_uploads/yunits",
    public_id: (req, file) => {
      return `yunit_${Date.now()}_${file.originalname}`;
    },
  },
  allowedFormats: ["jpg", "jpeg", "png", "gif"],
  timeout: 60000 * 5,
});
const upload = multer({ storage: storage });

router.post("/add", upload.single("yunitThumbnail"), yunitsController.addYunit);

router.get("/view/:yunitId", yunitsController.viewYunit);
router.put(
  "/edit/:yunitId",
  upload.single("yunitThumbnail"),
  yunitsController.editYunit
);

router.delete("/delete/:yunitId", yunitsController.deleteYunit);

router.get("/:userId", yunitsController.getYunitsByTeacher);

module.exports = router;
