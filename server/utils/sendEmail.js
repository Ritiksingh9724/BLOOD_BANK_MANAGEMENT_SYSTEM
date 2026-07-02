const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
  try {
    console.log("========== EMAIL DEBUG ==========");
    console.log("TO:", to);
    console.log("FROM:", process.env.EMAIL);

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    console.log("Connecting to Gmail...");

    await transporter.verify();

    console.log("SMTP Connected");

    const info = await transporter.sendMail({
      from: process.env.EMAIL,
      to,
      subject,
      text,
    });

    console.log("Email Sent:", info.messageId);

  } catch (error) {
    console.log("EMAIL ERROR");
    console.log(error);
  }
};

module.exports = sendEmail;