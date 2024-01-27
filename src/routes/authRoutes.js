const express = require("express");
const router = express.Router();
const userAuthController = require("../controllers/authentication/allUserAuthController");
const adminAuthController = require("../controllers/authentication/adminAuthController");
const teacherAuthController = require("../controllers/authentication/teacherAuthController");

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
