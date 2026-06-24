const sendEmail = require("../utils/sendEmail");
const otpGenerator = require("otp-generator");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// =========================
// REGISTER
// =========================

const registerController = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      role,
    } = req.body;
    if (
      !name ||
      !email ||
      !phone ||
      !password ||
      !role
    ) {
      return res.status(400).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "User Already Exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await new User({
      name,
      email,
      phone,
      password: hashedPassword,
      role,
    }).save();

    res.status(201).send({
      success: true,
      message: "Registration Successful",
      user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error In Register API",
      error,
    });
  }
};

// =========================
// SEND OTP
// =========================

const sendOTPController = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    user.otp = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000;

    await user.save();

    await sendEmail(
      email,
      "Password Reset OTP",
      `Your OTP is ${otp}. Valid for 5 minutes.`
    );

    res.status(200).send({
      success: true,
      message: "OTP Sent Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error Sending OTP",
    });
  }
};

// =========================
// VERIFY OTP
// =========================

const verifyOTPController = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (
      !user ||
      user.otp !== otp ||
      user.otpExpiry < Date.now()
    ) {
      return res.status(400).send({
        success: false,
        message: "Invalid OTP",
      });
    }

    res.status(200).send({
      success: true,
      message: "OTP Verified",
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error Verifying OTP",
    });
  }
};

// =========================
// RESET PASSWORD
// =========================

const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    user.password = hashedPassword;
    user.otp = "";
    user.otpExpiry = null;

    await user.save();

    res.status(200).send({
      success: true,
      message: "Password Updated Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error Resetting Password",
    });
  }
};

// =========================
// LOGIN
// =========================

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message:
          "Please Provide Email And Password",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }

    const comparePassword =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!comparePassword) {
      return res.status(401).send({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).send({
      success: true,
      message: "Login Successful",
      token,
      user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error In Login API",
      error,
    });
  }
};
const updateProfileController = async (req, res) => {
  try {

    const { id, name, email, phone } = req.body;

    const user = await User.findByIdAndUpdate(
  id,
  {
    name,
    email,
    phone,
  },
  { new: true }
);

    res.status(200).send({
      success: true,
      message: "Profile Updated Successfully",
      user,
    });

  } catch (error) {

    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error Updating Profile",
    });

  }
};

module.exports = {
  registerController,
  loginController,
  sendOTPController,
  verifyOTPController,
  resetPasswordController,
  updateProfileController,
};