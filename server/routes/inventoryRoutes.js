const express =
  require("express");

const router =
  express.Router();

const {

  getInventoryController,

  addInventoryController,

  deleteInventoryController,

} = require(

  "../controllers/inventoryController"

);



router.get(

  "/all-inventory",

  getInventoryController

);


router.post(

  "/add-inventory",

  addInventoryController

);


router.delete(

  "/delete-inventory/:id",

  deleteInventoryController

);

module.exports = router;