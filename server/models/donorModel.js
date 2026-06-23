const mongoose =
  require("mongoose");

const donorSchema =
  new mongoose.Schema(

    {

      name: {
        type: String,
        required: true,
      },

      bloodGroup: {
        type: String,
        required: true,
      },

      age: {
        type: Number,
        required: true,
      },

      phone: {
        type: String,
        required: true,
      },

      city: {
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
    "Donor",
    donorSchema
  );