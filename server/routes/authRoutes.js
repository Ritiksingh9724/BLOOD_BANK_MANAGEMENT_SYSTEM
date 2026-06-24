const express = require("express");

const {

  registerController,

  loginController,

  sendOTPController,

  verifyOTPController,

  resetPasswordController,

  updateProfileController,

} = require("../controllers/authController");

const router = express.Router();

// ==========================
// REGISTER
// ==========================

router.post(
  "/register",
  registerController
);

// ==========================
// LOGIN
// ==========================

router.post(
  "/login",
  loginController
);

// ==========================
// SEND OTP
// ==========================

router.post(
  "/send-otp",
  sendOTPController
);

// ==========================
// VERIFY OTP
// ==========================

router.post(
  "/verify-otp",
  verifyOTPController
);

// ==========================
// RESET PASSWORD
// ==========================

router.post(
  "/reset-password",
  resetPasswordController
);
// ==========================
// UPDATE PROFILE
// ==========================

router.put(
  "/update-profile",
  updateProfileController
);
module.exports = router;