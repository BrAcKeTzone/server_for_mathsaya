const express = require("express");
const router = express.Router();
const superadminController = require("../controllers/superadminController");

router.post("/login", superadminController.login);

router.get("/teachers", superadminController.getTeachers);

router.put("/edit/teacher/:id", superadminController.editTeacher);

router.delete("/delete/teacher/:id", superadminController.deleteTeacher);

router.post("/add-superadmin", superadminController.addSuperAdmin);

module.exports = router;
