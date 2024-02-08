"use strict";

var express = require("express");
var router = express.Router();
var sectionsController = require("../controllers/mostUsers/sectionsController");
router.post("/add", sectionsController.addSection);
router.get("/view/:sectionId", sectionsController.viewSection);
router.put("/edit/:sectionId", sectionsController.editSection);
router["delete"]("/delete/:sectionId", sectionsController.deleteSection);
router.get("/:userId", sectionsController.getSectionsByTeacher);
module.exports = router;