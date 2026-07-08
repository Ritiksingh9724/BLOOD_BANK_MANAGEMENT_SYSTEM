const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.log("SMTP ERROR:", error);
  } else {
    console.log("SMTP Connected");
  }
});

const sendEmail = async (to, subject, text) => {
  const info = await transporter.sendMail({
    from: process.env.EMAIL,
    to,
    subject,
    text,
  });

  console.log(info);
};

module.exports = sendEmail;