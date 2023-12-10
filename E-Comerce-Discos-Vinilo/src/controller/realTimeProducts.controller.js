//
import { logger } from "../helpers/logger.js";

export class realTimeProductsController {
  /////////////////////////////////////////////////////
  static renderRealTimeProductsView = async (req, res) => {
    try {
      if (req.user?.email) {
        const sessionExist = req.user.email && true;
        const data = {
          sessionExist,
          role: req.user.role,
          userFirstName: req.user.name,
          style: "realTimeProducts.css",
        };
        res.render("realTimeProducts", data);
      } else {
        res.redirect("/api/session/session_destroyed");
      }
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ message: error.message });
    }
  };
}
