const express = require("express");
const router = express.Router();
const studentsController = require("../controllers/studentsController");

router.post("/add", studentsController.addStudent);

router.get("/view/:studentId", studentsController.viewStudent);

router.put("/edit/:studentId", studentsController.editStudent);

router.delete("/delete/:studentId", studentsController.deleteStudent);

router.get("/students/:sectionId", studentsController.getStudentsBySection);

module.exports = router;
