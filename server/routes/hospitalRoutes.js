const express = require("express");

const {

  createHospitalController,

  getHospitalController,

} = require(
  "../controllers/hospitalController"
);

const router = express.Router();


// routes

router.post(
  "/create-hospital",
  createHospitalController
);

router.get(
  "/get-hospitals",
  getHospitalController
);

module.exports = router;