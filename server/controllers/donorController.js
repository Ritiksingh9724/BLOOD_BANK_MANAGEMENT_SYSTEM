const Donor =
  require("../models/donorModel");


// ============================
// GET ALL DONORS
// ============================

const getDonorsController = async (req, res) => {
  try {

    let donors;

    // Admin sees all donors
    if (req.user.role === "admin") {
      donors = await Donor.find().sort({
        createdAt: -1,
      });
    }

    // Donor sees only their own donors
    else {
      donors = await Donor.find({
        userId: req.user._id,
      }).sort({
        createdAt: -1,
      });
    }

    res.status(200).send({
      success: true,
      totalDonors: donors.length,
      donors,
    });

  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error Fetching Donors",
      error,
    });
  }
};

// ============================
// ADD DONOR
// ============================

const addDonorController =
  async (req, res) => {

    try {

      const {
        name,
        bloodGroup,
        age,
        phone,
        city,
      } = req.body;

      // validation

      if (
        !name ||
        !bloodGroup ||
        !age ||
        !phone ||
        !city
      ) {

        return res.status(400).send({

          success: false,

          message:
            "Please Provide All Fields",

        });
      }

      // create donor

      const donor = new Donor({
        userId: req.body.userId,
        name,
        bloodGroup,
        age,
        phone,
        city,
      });

      // save donor

      await donor.save();

      res.status(201).send({

        success: true,

        message:
          "Donor Added Successfully",

        donor,

      });

    } catch (error) {

      console.log(error);

      res.status(500).send({

        success: false,

        message:
          "Error Adding Donor",

        error,

      });

    }
  };


// ============================
// DELETE DONOR
// ============================

const deleteDonorController = async (req, res) => {
  try {

    let donor;

    // Admin can delete any donor
    if (req.user.role === "admin") {

      donor = await Donor.findByIdAndDelete(req.params.id);

    } else {

      // Donor cannot delete
      return res.status(403).send({
        success: false,
        message: "Only Admin can delete donors",
      });

    }

    if (!donor) {
      return res.status(404).send({
        success: false,
        message: "Donor Not Found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Donor Deleted Successfully",
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error Deleting Donor",
      error,
    });
  }
};

// ============================
// EXPORT
// ============================

module.exports = {

  getDonorsController,

  addDonorController,

  deleteDonorController,

};