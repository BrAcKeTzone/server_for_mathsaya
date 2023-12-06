const express = require("express");
const router = express.Router();
const yunitsController = require("../controllers/yunitsController");

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
