const brevo = require("@getbrevo/brevo");

const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

const sendEmail = async (to, subject, text) => {
  try {
    const email = {
      sender: {
        name: "Blood Bank Management System",
        email: process.env.BREVO_EMAIL,
      },
      to: [{ email: to }],
      subject,
      textContent: text,
    };

    const response = await apiInstance.sendTransacEmail(email);

    console.log("Email Sent:", response.body);
  } catch (error) {
    console.log("EMAIL ERROR:");
    console.log(error.response?.body || error);
    throw error;
  }
};

module.exports = sendEmail;