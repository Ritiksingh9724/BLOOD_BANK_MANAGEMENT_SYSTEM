const express = require("express");

const router = express.Router();

const {

  getNotificationsController,

  markReadController,

} = require("../controllers/notificationController");

// Get Notifications

router.get(
  "/:userId",
  getNotificationsController
);

// Mark Read

router.put(
  "/read/:id",
  markReadController
);

module.exports = router;