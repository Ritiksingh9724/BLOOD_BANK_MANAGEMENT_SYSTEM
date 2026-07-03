const Notification = require("../models/notificationModel");
const User = require("../models/userModel");
const sendEmail = require("../utils/sendEmail");
const requestModel = require("../models/requestModel");

// ============================
// CREATE REQUEST
// ============================

const createRequestController = async (req, res) => {
  try {
    const {
      hospitalId,
      hospitalName,
      bloodGroup,
      quantity,
      email,
    } = req.body;

    const request = new requestModel({
      hospitalId,
      hospitalName,
      bloodGroup,
      quantity,
      email,
    });

    await request.save();

    // Admin Notifications

    const admins = await User.find({
      role: "admin",
    });

    for (const admin of admins) {
      await Notification.create({
        userId: admin._id,
        role: "admin",
        title: "New Blood Request",
        message: `${hospitalName} requested ${quantity} unit(s) of ${bloodGroup} blood.`,
      });
    }

    // Email

    await sendEmail(
    process.env.EMAIL,
    "New Blood Request",
      `A new blood request has been created.

Blood Group: ${bloodGroup}

Quantity: ${quantity}

Hospital Email: ${email}

Please check the Blood Bank Management System.`
    );

    res.status(201).send({
      success: true,
      message: "Blood Request Sent Successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error Creating Request",
      error,
    });

  }
};

// ============================
// GET REQUESTS
// ============================

const getRequestController = async (req, res) => {

  try {

    const { hospitalId, role } = req.query;

    let requests;

    if (role === "admin") {

      requests = await requestModel
        .find({})
        .sort({ createdAt: -1 });

    } else {

      requests = await requestModel
        .find({
          hospitalId,
        })
        .sort({ createdAt: -1 });

    }

    res.status(200).send({
      success: true,
      requests,
    });

  } catch (error) {

    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error Fetching Requests",
    });

  }

};

// ============================
// UPDATE REQUEST STATUS
// ============================

const updateRequestStatusController = async (req, res) => {

  try {

    const { status } = req.body;

    const updatedRequest = await requestModel.findByIdAndUpdate(
      req.params.id,
      {
        status,
      },
      {
        new: true,
      }
    );

    // Notification to Hospital

    await Notification.create({

      userId: updatedRequest.hospitalId,

      role: "hospital",

      title: "Blood Request Updated",

      message: `Your blood request has been ${status}.`,

    });

    // ==========================================
    // EMAIL TEMPORARILY DISABLED FOR TESTING
    // ==========================================

    /*
    await sendEmail(
      updatedRequest.email,
      "Blood Request Status Updated",
      `Your blood request status has been updated.

Blood Group: ${updatedRequest.bloodGroup}

Quantity: ${updatedRequest.quantity}

Status: ${status}`
    );
    */

    res.status(200).send({

      success: true,

      message: "Request Status Updated",

    });

  } catch (error) {
  console.log("========= UPDATE REQUEST ERROR =========");
  console.error(error);

  res.status(500).send({
    success: false,
    message: "Error Updating Request",
    error: error.message,
  });
}

};
// ============================
// UPDATE PAYMENT STATUS
// ============================

const updatePaymentStatusController = async (req, res) => {

  try {

    const updatedRequest =
      await requestModel.findByIdAndUpdate(

        req.params.id,

        {
          paymentStatus: "Paid",
        },

        {
          new: true,
        }

      );

    // Notification

    await Notification.create({

      userId: updatedRequest.hospitalId,

      role: "hospital",

      title: "Payment Successful",

      message:
        "Your payment has been completed successfully.",

    });

    res.status(200).send({

      success: true,

      message: "Payment Status Updated",

      updatedRequest,

    });

  } catch (error) {

    console.log(error);

    res.status(500).send({

      success: false,

      message: "Error Updating Payment Status",

    });

  }

};

module.exports = {

  createRequestController,

  getRequestController,

  updateRequestStatusController,

  updatePaymentStatusController,

};