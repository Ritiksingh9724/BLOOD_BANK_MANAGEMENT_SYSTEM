const express = require("express");

const {
  createRequestController,
  getRequestController,
  updateRequestStatusController,
  updatePaymentStatusController,
} = require("../controllers/requestController");

const router = express.Router();

// create request
router.post(
  "/create-request",
  createRequestController
);

// get requests
router.get(
  "/get-requests",
  getRequestController
);

// update request status
router.put(
  "/update-status/:id",
  updateRequestStatusController
);

// update payment status
router.put(
  "/payment/:id",
  updatePaymentStatusController
);

module.exports = router;