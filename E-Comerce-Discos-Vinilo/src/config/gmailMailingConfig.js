//
import nodemailer from "nodemailer";
import { generalConfig } from "./generalConfig.js";

//Se crea un transporte para definir que tipo de servicios vamos a utilizar, en este caso gmail

export const transporterGmail = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: generalConfig.gmail.account,
    pass: generalConfig.gmail.password,
  },
  //desactivamos por el momento la seguridad de gmail
  secure: false,
  tls: {
    rejectUnauthorized: false,
  },
});
