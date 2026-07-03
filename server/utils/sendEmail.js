const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
  try {
    console.log("Sending email...");
    console.log("To:", to);
    console.log("From:", process.env.EMAIL);
    const transporter = nodemailer.createTransport({
      host: "74.125.140.108", // Gmail SMTP IPv4
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        servername: "smtp.gmail.com",
      },
    });

    const verify = await transporter.verify();
    console.log("VERIFY:", verify);
    console.log("SMTP Connected");

    const info = await transporter.sendMail({
      from: process.env.EMAIL,
      to,
      subject,
      text,
    });
    console.log(info);
    console.log("Email Sent Successfully");
  } catch (error) {
    console.log("EMAIL ERROR:");
    console.log(error);
  }
};

module.exports = sendEmail;