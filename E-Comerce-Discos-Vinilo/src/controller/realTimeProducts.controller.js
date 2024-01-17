//
import { logger } from "../helpers/logger.js";

//Creación y exportación de una variable para utilizarla en app.js y con la que podemos acceder al usuario conectado en el protocolo websocket. La definimos en la siguiente ruta, ya que tenemos acceso al objeto req.user que viene de la sesión iniciada utilzando Token.
export let userConnected;

export class realTimeProductsController {
  /////////////////////////////////////////////////////
  static renderRealTimeProductsView = async (req, res) => {
    try {
      if (req.user?.email) {
        userConnected = req.user;
        const sessionExist = req.user.email && true;
        const data = {
          sessionExist,
          role: req.user.role,
          userFirstName: req.user.name,
          userId: req.user.id,
          style: "realTimeProducts.css",
        };
        res.render("realTimeProducts", data);
      } else {
        res.redirect("/api/session/session_destroyed");
      }
    } catch (error) {
      logger.error(error.message);
      res.json({ message: error.message });
    }
  };
}
