const axios = require("axios");

const sendEmail = async (to, subject, text) => {
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "Blood Bank Management System",
          email: process.env.BREVO_EMAIL,
        },
        to: [{ email: to }],
        subject,
        textContent: text,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Email Sent:", response.data);
  } catch (error) {
    console.log("EMAIL ERROR:");
    console.log(error.response?.data || error.message);
    throw error;
  }
};

module.exports = sendEmail;