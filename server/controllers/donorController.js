const Donor =
  require("../models/donorModel");


// ============================
// GET ALL DONORS
// ============================

const getDonorsController =
  async (req, res) => {

    try {

      const donors =
        await Donor.find().sort({
          createdAt: -1,
        });

      res.status(200).send({

        success: true,

        totalDonors:
          donors.length,

        donors,

      });

    } catch (error) {

      console.log(error);

      res.status(500).send({

        success: false,

        message:
          "Error Fetching Donors",

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

const deleteDonorController =
  async (req, res) => {

    try {

      const { userId } = req.body;

      const donor = await Donor.findOneAndDelete({
        _id: req.params.id,
        userId,
      });

      if (!donor) {

        return res.status(404).send({

          success: false,

          message:
            "Donor Not Found",

        });
      }

      res.status(200).send({

        success: true,

        message:
          "Donor Deleted Successfully",

      });

    } catch (error) {

      console.log(error);

      res.status(500).send({

        success: false,

        message:
          "Error Deleting Donor",

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