const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
      connectionTimeout: 30000,
      greetingTimeout: 30000,
      socketTimeout: 30000,
    });

    await transporter.verify();
    console.log("SMTP Connected Successfully");

    const mailOptions = {
      from: process.env.EMAIL,
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);

    console.log("Email Sent Successfully");
  } catch (error) {
    console.log("EMAIL ERROR:", error);
  }
};

module.exports = sendEmail;