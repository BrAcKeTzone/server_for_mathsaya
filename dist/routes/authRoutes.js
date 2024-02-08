"use strict";

var express = require("express");
var router = express.Router();
var userAuthController = require("../controllers/authentication/allUserAuthController");
var adminAuthController = require("../controllers/authentication/adminAuthController");
var teacherAuthController = require("../controllers/authentication/teacherAuthController");
router.post("/signup", userAuthController.signup);
router.post("/verifyTeacher", teacherAuthController.verifyOTP);
router.post("/verifyAdmin", adminAuthController.verifyOTP);
router.post("/forgotPass", userAuthController.forgotPassword);
router.put("/verifyForgotPass", userAuthController.verifyForgotPassword);
router.post("/changeEmail", userAuthController.changeEmail);
router.put("/verifyChangeEmail", userAuthController.verifyEmailChange);
router.post("/changePass", userAuthController.changePassword);
router.put("/verifyChangePass", userAuthController.verifyChangePassword);
router.post("/login", userAuthController.login);
router.get("/:userId", userAuthController.getCurrentUser);
module.exports = router;