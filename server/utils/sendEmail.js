const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.BREVO_HOST,
  port: Number(process.env.BREVO_PORT),
  secure: false,
  auth: {
    user: process.env.BREVO_LOGIN,
    pass: process.env.BREVO_PASSWORD,
  },
});

const sendEmail = async (to, subject, text) => {
  try {
    console.log("Sending email to:", to);

    // Check SMTP connection
    await transporter.verify();
    console.log("SMTP Connected");

    const info = await transporter.sendMail({
      from: `"Blood Bank Management System" <${process.env.BREVO_EMAIL}>`,
      to,
      subject,
      text,
    });

    console.log("Email Sent Successfully");
    console.log(info.messageId);

    return info;
  } catch (error) {
    console.log("EMAIL ERROR:");
    console.log(error);
    throw error;
  }
};

module.exports = sendEmail;