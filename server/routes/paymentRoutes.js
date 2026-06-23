const express = require("express");

const router = express.Router();

const {
  createOrderController,
} = require("../controllers/paymentController");

// Create Razorpay Order

router.post(
  "/create-order",
  createOrderController
);

module.exports = router;