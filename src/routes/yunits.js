const express = require("express");
const multer = require("multer");
const router = express.Router();
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinaryConfig");
const yunitsController = require("../controllers/yunitsController");

// Define storage for uploaded files using Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    resource_type: "image",
    folder: "mathsaya_uploads/yunits", // Folder where images will be stored in Cloudinary
    public_id: (req, file) => {
      // You can customize the public_id here if needed
      return `yunit_${Date.now()}_${file.originalname}`;
    },
  },
  allowedFormats: ["jpg", "jpeg", "png"], // Specify allowed formats
  timeout: 60000, // in milliseconds
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

router.get("/yunits/:teacherId", yunitsController.getYunitsByTeacher);

module.exports = router;
