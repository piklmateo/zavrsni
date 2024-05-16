import nodemailer from "nodemailer";
import env from "dotenv";

env.config();

let mailer = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

exports.sendMail = async function (from, to, subject, message) {
  message = {
    from: from,
    to: to,
    subject: subject,
    text: message,
  };

  let response = await mailer.sendMail(message);
  console.log(response);
  return response;
};
