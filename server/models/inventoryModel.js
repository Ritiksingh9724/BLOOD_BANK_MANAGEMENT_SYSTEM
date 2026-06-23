const mongoose =
  require("mongoose");

const inventorySchema =
  new mongoose.Schema(

    {

      // inventory type

      inventoryType: {

        type: String,

        required: true,

        enum: [
          "in",
          "out",
        ],

      },

      // blood group

      bloodGroup: {

        type: String,

        required: true,

        enum: [

          "A+",
          "A-",

          "B+",
          "B-",

          "AB+",
          "AB-",

          "O+",
          "O-",

        ],

      },

      // blood quantity

      quantity: {

        type: Number,

        required: true,

        min: 1,

      },

      // user email

      email: {

        type: String,

        required: true,

        trim: true,

      },

      // organisation

      organisation: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref: "users",

        required: true,

      },

      // hospital

      hospital: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref: "users",

        default: null,

      },

      // donor

      donor: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref: "users",

        default: null,

      },

    },

    {

      timestamps: true,

    }
  );

module.exports =
  mongoose.model(

    "Inventory",

    inventorySchema

  );