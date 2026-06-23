const Inventory =
  require("../models/inventoryModel");


// ============================
// GET INVENTORY
// ============================

const getInventoryController =
  async (req, res) => {

    try {

      const inventory =
        await Inventory.find()
          .sort({
            createdAt: -1,
          });

      res.status(200).send({

        success: true,

        inventory,

      });

    } catch (error) {

      console.log(error);

      res.status(500).send({

        success: false,

        message:
          "Error Fetching Inventory",

        error,

      });

    }
  };


// ============================
// ADD INVENTORY
// ============================

const addInventoryController =
  async (req, res) => {

    try {

      const {

        inventoryType,

        bloodGroup,

        quantity,

        email,

        organisation,

      } = req.body;

      // validation

      if (

        !inventoryType ||

        !bloodGroup ||

        !quantity ||

        !email ||

        !organisation

      ) {

        return res.status(400).send({

          success: false,

          message:
            "Please Fill All Fields",

        });
      }

      // create inventory

      const inventory =
        new Inventory({

          inventoryType,

          bloodGroup,

          quantity,

          email,

          organisation,

        });

      // save

      await inventory.save();

      res.status(201).send({

        success: true,

        message:
          "Inventory Added Successfully",

        inventory,

      });

    } catch (error) {

      console.log(error);

      res.status(500).send({

        success: false,

        message:
          "Error Adding Inventory",

        error,

      });

    }
  };


// ============================
// DELETE INVENTORY
// ============================

const deleteInventoryController =
  async (req, res) => {

    try {

      await Inventory.findByIdAndDelete(
        req.params.id
      );

      res.status(200).send({

        success: true,

        message:
          "Inventory Deleted Successfully",

      });

    } catch (error) {

      console.log(error);

      res.status(500).send({

        success: false,

        message:
          "Error Deleting Inventory",

        error,

      });

    }
  };


// ============================
// EXPORT
// ============================

module.exports = {

  getInventoryController,

  addInventoryController,

  deleteInventoryController,

};