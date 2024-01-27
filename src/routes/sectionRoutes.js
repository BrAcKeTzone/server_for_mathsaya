const express = require("express");
const router = express.Router();
const sectionsController = require("../controllers/mostUsers/sectionsController");

router.post("/add", sectionsController.addSection);

router.get("/view/:sectionId", sectionsController.viewSection);

router.delete("/delete/:sectionId", sectionsController.deleteSection);

router.get("/:userId", sectionsController.getSectionsByTeacher);

module.exports = router;
