const nodemailer = require("nodemailer");
const yup = require("yup");
require("dotenv").config();

function sendEmail(email, bill) {
  const text = `Muchas gracias por comprar en FakeStoreApi, a continuación se muestran los detalles de tu compra:\n${bill}`
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
      from: "FakeStoreApi <fakestoreecommerce@gmail.com>",
      to: email,
      subject: "Factura de compra en FakeStoreApi",
      text: text,
    },
    function (error) {
      if (error) {
        console.log(error);
      }
    }
  );
}

async function validationEmail(firstName, lastName, email) {
  let schema = yup.object().shape({
    firstName: yup.string().required().min(3).max(20),
    lastName: yup.string().required().min(3).max(20),
    email: yup.string().required().email().max(255),
  });

  let valid = await schema.isValid({
    firstName: firstName,
    lastName: lastName,
    email: email,
  });

  return valid;
}

module.exports = { sendEmail, validationEmail };
