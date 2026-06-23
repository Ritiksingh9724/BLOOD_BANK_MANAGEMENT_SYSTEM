const express = require("express");

const {
  getDashboardStats,
} = require("../controllers/dashboardController");

const router = express.Router();


// routes

router.get(
  "/stats",
  getDashboardStats
);


module.exports = router;