"use strict";

var express = require("express");
var router = express.Router();
var multer = require("multer");
var _require = require("multer-storage-cloudinary"),
  CloudinaryStorage = _require.CloudinaryStorage;
var cloudinary = require("../config/cloudinaryConfig");
var teacherController = require("../controllers/mostUsers/teacherController");
var sAdminController = require("../controllers/adminOnly/sAdminController");
var storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    resource_type: "auto",
    folder: "mathsaya_uploads/email_attachments",
    public_id: function public_id(req, file) {
      return "email_attachment_".concat(Date.now(), "_").concat(file.originalname);
    }
  },
  allowedFormats: ["jpg", "jpeg", "png", "mp4"],
  timeout: 60000 * 5
});
var upload = multer({
  storage: storage
});
router.post("/send/:userId", upload.single("attachment"), teacherController.messageToAdmin);
router.get("/stats/:userId", teacherController.getDashboardStats);
router.get("/teachers/:userId", sAdminController.getTeachers);
router.get("/admins/:userId", sAdminController.getAdmins);
router.get("/inbox/unread/:userId", sAdminController.inboxUnreadEntries);
router.get("/inbox/read/:userId", sAdminController.inboxReadEntries);
router.get("/inbox/all/:userId", sAdminController.inboxAllEntries);
router.get("/inbox/view/:emailId/:userId", sAdminController.viewInboxEntry);
router["delete"]("/inbox/delete/:emailId/:userId", sAdminController.deleteInboxEntry);
router.get("/admin/:userId", sAdminController.getAdminInfo);
router.put("/admin/edit/:userId", sAdminController.editAdminInfo);
router["delete"]("/admin/delete/:userId", sAdminController.deleteAdmin);
router.get("/teacher/:userId", teacherController.getTeacherInfo);
router.put("/teacher/edit", teacherController.editTeacherInfo);
router.put("/bypass/teacher/edit/:userId", sAdminController.editTeacherInfo);
router["delete"]("/teacher/delete/:userId", sAdminController.deleteTeacher);
module.exports = router;