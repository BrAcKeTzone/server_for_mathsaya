const express = require("express");
const router = express.Router();
const sectionsController = require("../controllers/teacher/sectionsController");

router.post("/add", sectionsController.addSection);

router.get("/view/:sectionId", sectionsController.viewSection);

router.delete("/delete/:sectionId", sectionsController.deleteSection);

router.get("/list/:teacherId", sectionsController.getSectionsByTeacher);

module.exports = router;
