const nodemailer = require("nodemailer");

console.log("========== SEND EMAIL FILE LOADED ==========");
console.log("EMAIL =", process.env.EMAIL);
console.log("PASSWORD =", process.env.EMAIL_PASSWORD);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmail = async (to, subject, text) => {
  const info = await transporter.sendMail({
    from: process.env.EMAIL,
    to,
    subject,
    text,
  });

  console.log(info.messageId);
};

module.exports = sendEmail;