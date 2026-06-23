const hospitalModel = require(
  "../models/hospitalModel"
);


// CREATE HOSPITAL

const createHospitalController =
  async (req, res) => {

    try {

      const hospital =
        new hospitalModel(req.body);

      await hospital.save();

      res.status(201).send({

        success: true,

        message:
          "Hospital Added Successfully",

      });

    } catch (error) {

      console.log(error);

      res.status(500).send({

        success: false,

        message:
          "Error In Hospital API",

      });

    }
  };


// GET HOSPITALS

const getHospitalController =
  async (req, res) => {

    try {

      const hospitals =
        await hospitalModel
          .find({})
          .sort({ createdAt: -1 });

      res.status(200).send({

        success: true,

        hospitals,

      });

    } catch (error) {

      console.log(error);

      res.status(500).send({

        success: false,

        message:
          "Error Fetching Hospitals",

      });

    }
  };


module.exports = {

  createHospitalController,

  getHospitalController,

};