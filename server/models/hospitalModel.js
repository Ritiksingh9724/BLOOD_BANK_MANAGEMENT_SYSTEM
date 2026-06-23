const mongoose = require("mongoose");

const hospitalSchema =
  new mongoose.Schema(

    {

      hospitalName: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
        required: true,
      },

      address: {
        type: String,
        required: true,
      },

    },

    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Hospital",
    hospitalSchema
  );