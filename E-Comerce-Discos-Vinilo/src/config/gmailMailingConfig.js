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

//Template para enviar al usuario cuando realiza una compra

export const emailTemplate = (productsSold) => {
/* let productsElms = ""; */
console.log(productsSold)
`  <head>
<link rel="stylesheet" type="text/css" href="./public/css/templateEmail.css">
</head><div>
<h1>GRACIAS POR TU COMPRA !!</h1>
<a href="http://localhost:8080/api/session/login">Ir al sitio</a>
</div>`;
}