const sendEmail =
  require("../utils/sendEmail");

const requestModel =
  require("../models/requestModel");

// ============================
// CREATE REQUEST
// ============================

const createRequestController =
  async (req, res) => {

    try {

      const {

        bloodGroup,

        quantity,

        email,

      } = req.body;

      // create request

      const request =
        new requestModel(req.body);

      // save request

      await request.save();

      // ============================
      // SEND EMAIL TO ADMIN
      // ============================

      await sendEmail(

        process.env.EMAIL,

        "New Blood Request",

        `A new blood request has been created.

Blood Group: ${bloodGroup}

Quantity: ${quantity}

Hospital Email: ${email}

Please check the Blood Bank Management System.`

      );

      // response

      res.status(201).send({

        success: true,

        message:
          "Blood Request Sent Successfully",

      });

    } catch (error) {

      console.log(error);

      res.status(500).send({

        success: false,

        message:
          "Error Creating Request",

      });

    }
  };

// ============================
// GET REQUESTS
// ============================

const getRequestController =
  async (req, res) => {

    try {

      const requests =
        await requestModel
          .find({})
          .sort({
            createdAt: -1,
          });

      res.status(200).send({

        success: true,

        requests,

      });

    } catch (error) {

      console.log(error);

      res.status(500).send({

        success: false,

        message:
          "Error Fetching Requests",

      });

    }
  };

// ============================
// UPDATE REQUEST STATUS
// ============================

const updateRequestStatusController =
  async (req, res) => {

    try {

      const {

        status,

      } = req.body;

      // find request

      const request =
        await requestModel.findById(
          req.params.id
        );

      // update status

      await requestModel.findByIdAndUpdate(

        req.params.id,

        {
          status,
        }

      );

      // ============================
      // SEND EMAIL TO HOSPITAL
      // ============================

      await sendEmail(

        request.email,

        "Blood Request Status Updated",

        `Your blood request status has been updated.

Blood Group: ${request.bloodGroup}

Quantity: ${request.quantity}

New Status: ${status}

Thank you for using Blood Bank Management System.`

      );

      // response

      res.status(200).send({

        success: true,

        message:
          "Request Status Updated",

      });

    } catch (error) {

      console.log(error);

      res.status(500).send({

        success: false,

        message:
          "Error Updating Request",

      });

    }
  };
// ============================
// UPDATE PAYMENT STATUS
// ============================

const updatePaymentStatusController = async (req, res) => {
  try {

    console.log("Payment Update Called");
    console.log("ID:", req.params.id);

    const updatedRequest =
      await requestModel.findByIdAndUpdate(
        req.params.id,
        {
          paymentStatus: "Paid",
        },
        { new: true }
      );

    console.log(updatedRequest);

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
// ============================
// EXPORTS
// ============================

module.exports = {
  createRequestController,
  getRequestController,
  updateRequestStatusController,
  updatePaymentStatusController,
};