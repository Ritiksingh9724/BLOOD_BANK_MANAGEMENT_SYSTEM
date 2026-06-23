require("dotenv").config();

const Razorpay = require("razorpay");

console.log("KEY ID:", process.env.RAZORPAY_KEY_ID);
console.log("KEY SECRET:", process.env.RAZORPAY_KEY_SECRET);

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createOrderController = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.status(200).send({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error Creating Payment Order",
    });
  }
};

module.exports = {
  createOrderController,
};