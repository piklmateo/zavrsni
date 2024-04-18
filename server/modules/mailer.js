import nodemailer from "nodemailer";

let mailer = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "mpikl20@student.foi.hr",
    pass: "mopx lidp gxhj guwi",
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
