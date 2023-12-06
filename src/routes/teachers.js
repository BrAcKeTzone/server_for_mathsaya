const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController");

router.post("/signup", teacherController.signup);

router.post("/login", teacherController.login);

router.put("/edit/:id", teacherController.editTeacher);

router.get("/teacher/:id", teacherController.getTeacherInfo);

module.exports = router;
