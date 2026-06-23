const express = require("express");

const router = express.Router();

const {

  getDonorsController,

  addDonorController,

  deleteDonorController,

} = require("../controllers/donorController");


// GET ALL DONORS

router.get(
  "/all-donors",
  getDonorsController
);


// ADD DONOR

router.post(
  "/add-donor",
  addDonorController
);


// DELETE DONOR

router.delete(
  "/delete-donor/:id",
  deleteDonorController
);

module.exports = router;