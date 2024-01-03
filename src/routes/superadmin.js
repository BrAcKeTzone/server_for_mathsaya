const express = require("express");
const router = express.Router();
const superadminController = require("../controllers/superadmin/superadminController");

router.post("/login", superadminController.login);

router.post(
  "/check-superadmin/:superAdminId",
  superadminController.checkSuperAdminExists
);

router.get("/teachers", superadminController.getTeachers);

router.get("/total-teachers", superadminController.getTotalTeachers);

router.put("/edit-teacher/:id", superadminController.editTeacher);

router.delete("/delete-teacher/:id", superadminController.deleteTeacher);

router.get("/superadmins", superadminController.getSuperAdmins);

router.get("/total-superadmins", superadminController.getTotalSuperAdmins);

router.post("/add-superadmin", superadminController.addSuperAdmin);

router.put("/edit-superadmin/:id", superadminController.editSuperAdmin);

router.delete("/delete-superadmin/:id", superadminController.deleteSuperAdmin);

router.get("/view/:superAdminId", superadminController.getSuperAdminById);

module.exports = router;
