//
import { generalConfig } from "../config/generalConfig.js";
import jwt from "jsonwebtoken";
import { transporterGmail } from "../config/gmailMailingConfig.js";

//SESSION RESET PASSWORD
//Generamos el token para el tiempo de vida del correo de reestablecimiento de contraseña
export const createEmailToken = (email, time) => {
  const token = jwt.sign({ email }, generalConfig.gmail.tokenPass, {
    expiresIn: time,
  });
  return token;
};

//Template de gmail para enviar al usuario cuando necesita reestablecer la contraseña
export const emailTemplateNewPassword = (link) => {
  return `
  <html>
  <body>
    <main
      style=" width: 100%;
    height: auto;
    padding: 40px;
    display: flex;"
    >
      <section
        style="  width: 80%;
      height: auto;
      padding: 25px;
      border: solid 1px black;
      display: grid;
      align-items: center;"
      >
        <header
          style="width: 100%;
        height: 20vh;
        overflow: hidden;
        margin-bottom: 30px;"
        >
          <img
            style="  height: 100%;
          width: 100%;
          object-fit: cover;
          object-position: top;"
            src="https://res.cloudinary.com/dqykftyy6/image/upload/v1695118019/foo-fighters-wallpaper-live-in-concert2_gco5bz.jpg"
            alt="Foo Fighters Logo"
          />
        </header>
        <img
          style="scale: 40%; margin:0 auto 30px auto;"
          src="https://res.cloudinary.com/dqykftyy6/image/upload/v1703102737/Logo-01_oxgxni.png"
          alt="Foo Fighters Logo"
        />
        <h1
          style="  width: 100%;
        text-align: center;
        font-size: 18 px;
        font-family: Hepta Slab;
        margin-bottom: 30px;"
        >Hola, ¿Has olvidado tu contraseña?</h1>
        <p
          style="  width: 90%;
        margin:0 auto 30px auto;
        text-align: center;
        font-size: 16px;
        font-family: Hepta Slab;"
        >Hemos recibido la solicitud para restablecer tu contraseña. En el
          siguiente enlace podrás ir al sitio nuevamente para seguir con el
          proceso. Ten en cuenta que dicho enlace tiene una validez de 1 hora
          luego de recibido el mismo.</p>
        <button
          style="  width: auto;
        color: black;
        background-color: transparent;
        padding: 10px;
        cursor: pointer;
        margin: auto;
        font-family: Hepta Slab;
        margin-bottom: 30px;"
        ><a
            style="  color: black;
        font-size: 18px;
        font-weight: 600;
        text-decoration: none;
        font-family: Hepta Slab;"
            href="${link}"
          >// Ingresa aquí //</a></button>
        <p
          style="  width: 100%;
        text-align: center;
        font-size: 12px;
        font-family: Hepta Slab;
        margin-bottom: 20px;"
        >Si no has sido tú, desestima este correo. Muchas gracias.</p>
      </section>
    </main>
  </body>
</html>
`;
};
//Función para enviar el token mediante correo de reestablecimiento de contraseña
export const emailToSendNewPass = async (req, email, token) => {
  const domain = `${req.protocol}://${req.get("host")}`;
  const link = `${domain}/api/session/generate_new_password?token=${token}`;
  await transporterGmail.sendMail({
    from: generalConfig.gmail.account,
    to: email,
    subject: "Reestablece tu contraseña",
    html: emailTemplateNewPassword(link),
  });
};

//Verificamos el token
export const emailTokenValidation = async (token) => {
  try {
    const info = await jwt.verify(token, generalConfig.gmail.tokenPass);
    return info;
  } catch (error) {
    return null;
  }
};

//CART PURCHASE
//Template de gmail para enviar al usuario cuando realiza una compra
export const emailTemplatePurchase = (products) => `
  /* let productsElms = ""; */
    <head>
    <link rel="stylesheet" type="text/css" href="./public/css/templateEmail.css">
    </head>
    <div>
    <h1>GRACIAS POR TU COMPRA !!</h1>
    <a href="http://localhost:8080/api/session/login">Ir al sitio</a>
    </div>`;

//Función para enviar el correo con el detalle de la compra
export const emailToSendPurchaseDetail = async (products, ticket) => {
  await transporterGmail.sendMail({
    from: generalConfig.gmail.account,
    to: ticket.purchaser,
    subject: "Detalle de tu compra. Foo Fighters Shop",
    //propidad text cuando queremos que solo sea texto
    html: emailTemplatePurchase(products),
  });
};
