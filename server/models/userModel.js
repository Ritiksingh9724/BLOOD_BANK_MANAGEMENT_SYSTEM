const mongoose =
  require("mongoose");

const userSchema =
  new mongoose.Schema(

    {

      name: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        required: true,
        unique: true,
      },

      password: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
        default: "",
      },
      profileImage: {
        type: String,
        default:
          "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      },
      role: {
        type: String,

        enum: [
          "admin",
          "donor",
          "hospital",
        ],

        default: "donor",
      },

      // Forgot Password OTP

      otp: {
        type: String,
        default: "",
      },

      otpExpiry: {
        type: Date,
      },

    },

    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "User",
    userSchema
  );