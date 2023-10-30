//
import { Router } from "express";
import { roleClient } from "../utils.js";
import passport from "passport";
const router = Router();

///////////////////////////////////////////////////////////////////

//GET
router.get(
  "/realtimeproducts",
  passport.authenticate("jwtAuth", { session: false }),
  async (req, res) => {
    try {
      if (req.user?.email) {
        const role = roleClient(req);
        const isAdmin = req.user.role === "Administrador" && true;
        const data = {
          isAdmin,
          role,
          userFirstName: req.user.name,
          style: "realTimeProducts.css",
        };
        res.render("realTimeProducts", data);
      } else {
        res.redirect("/session_destroyed");
      }
    } catch (error) {
      res.json({ Error: error.message });
    }
  }
);

export { router as realTimeProducts };
