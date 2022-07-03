const nodemailer = require("nodemailer");
require("dotenv").config();

function sendEmail(email, bill) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "fakestoreecommerce@gmail.com",
      pass: process.env.EMAIL_PASS,
    },
  });
  transporter.sendMail(
    {
      from: "FakeApiStore <fakestoreecommerce@gmail.com>",
      to:email,
      subject: "Factura de compra en FakeApiStore",
      text: bill,
    },
    function (error) {
      if (error) {
        console.log(error);
      } else {
        console.log("correo enviado exitosamente")
      }
    }
  );
}

module.exports = sendEmail
