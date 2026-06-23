const userModel = require("../models/userModel");

// dashboard stats
const getDashboardStats = async (
  req,
  res
) => {

  try {

    // total users
    const totalUsers =
      await userModel.countDocuments();

    // static demo data
    const totalBloodUnits = 450;

    const totalRequests = 34;

    const totalHospitals = 15;

    res.status(200).send({

      success: true,

      stats: {

        totalUsers,

        totalBloodUnits,

        totalRequests,

        totalHospitals,

      },

    });

  } catch (error) {

    console.log(error);

    res.status(500).send({

      success: false,

      message: "Dashboard API Error",

    });

  }

};

module.exports = {
  getDashboardStats,
};