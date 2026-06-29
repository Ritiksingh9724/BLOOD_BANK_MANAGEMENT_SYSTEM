require("dotenv").config();

const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createOrderController = async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const { units } = req.body;

    console.log("UNITS:", units);

    if (!units || units <= 0) {
      return res.status(400).send({
        success: false,
        message: "Invalid Units",
      });
    }

    const totalAmount = units * 500;

    console.log("TOTAL:", totalAmount);

    const options = {
      amount: totalAmount * 100, // Razorpay uses paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    console.log("OPTIONS:", options);

    const order = await razorpay.orders.create(options);

    console.log("ORDER CREATED:", order);

    res.status(200).send({
      success: true,
      order,
    });

  } catch (error) {

    console.log("========== PAYMENT ERROR ==========");
    console.log(error);
    console.log("MESSAGE:", error.message);
    console.log("STACK:", error.stack);

    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createOrderController,
};