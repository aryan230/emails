import asyncHandler from "express-async-handler";
import nodemailer from "nodemailer";
import Intro from "../Templates/intro.js";
import orderShipped from "../Templates/orderShipped.js";

const sendAnCustomEmail = asyncHandler(async (req, res) => {
  const { name, email } = req.body;

  let transporter = nodemailer.createTransport({
    host: "smtp.zoho.in",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "aryan@thehonestcareerco.in", // generated ethereal user
      pass: "Aryanankita", // generated ethereal password
    },
  });
  let info = await transporter.sendMail(
    {
      from: '"Aryan Agarwal" <aryan@thehonestcareerco.in>', // sender address
      to: email, // list of receivers
      subject: `Hey ${name}, `, // Subject line
      text: "Hello", // plain text body
      html: `${Intro(name, email)}`, // html body
    },
    (err, info) => {
      if (err) {
        return console.log(err);
      } else {
        res.status(201);
        res.json({ message: "Message sent: %s" + info.messageId });
      }
    }
  );
});

export { sendAnCustomEmail };
