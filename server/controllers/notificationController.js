const Notification = require("../models/notificationModel");

// ==========================
// GET USER NOTIFICATIONS
// ==========================

const getNotificationsController = async (req, res) => {

  try {

    const { userId } = req.params;

    const notifications = await Notification.find({
      userId,
    }).sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      notifications,
    });

  } catch (error) {

    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error Fetching Notifications",
    });

  }

};

// ==========================
// MARK AS READ
// ==========================

const markReadController = async (req, res) => {

  try {

    await Notification.findByIdAndUpdate(
      req.params.id,
      {
        isRead: true,
      }
    );

    res.status(200).send({
      success: true,
      message: "Notification Updated",
    });

  } catch (error) {

    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error",
    });

  }

};

module.exports = {
  getNotificationsController,
  markReadController,
};