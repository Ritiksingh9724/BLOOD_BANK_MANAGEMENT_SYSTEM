const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Verify Login

const requireSignIn = async (req, res, next) => {
  try {

    const token =
      req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).send({
        success: false,
        message: "Token Missing",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = await User.findById(decoded.id).select("-password");

    next();

  } catch (error) {

    console.log(error);

    res.status(401).send({
      success: false,
      message: "Invalid Token",
    });

  }
};

// Admin

const isAdmin = (req, res, next) => {

  if (req.user.role !== "admin") {

    return res.status(403).send({
      success: false,
      message: "Admin Only",
    });

  }

  next();

};

// Hospital

const isHospital = (req, res, next) => {

  if (req.user.role !== "hospital") {

    return res.status(403).send({
      success: false,
      message: "Hospital Only",
    });

  }

  next();

};

// Donor

const isDonor = (req, res, next) => {

  if (req.user.role !== "donor") {

    return res.status(403).send({
      success: false,
      message: "Donor Only",
    });

  }

  next();

};

module.exports = {
  requireSignIn,
  isAdmin,
  isHospital,
  isDonor,
};