const express = require("express");

const router = express.Router();

const {

  getDonorsController,

  addDonorController,

  deleteDonorController,

} = require("../controllers/donorController");


// GET ALL DONORS

const {
  requireSignIn,
} = require("../middleware/authMiddleware");

router.get(
  "/all-donors",
  requireSignIn,
  getDonorsController
);

router.post(
  "/add-donor",
  requireSignIn,
  addDonorController
);

router.delete(
  "/delete-donor/:id",
  requireSignIn,
  deleteDonorController
);

module.exports = router;