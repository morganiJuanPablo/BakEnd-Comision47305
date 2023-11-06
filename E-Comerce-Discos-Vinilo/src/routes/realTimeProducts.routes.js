//
import { Router } from "express";
import passport from "passport";
import { authorize, roleClient } from "../utils.js";
const router = Router();
let role = roleClient();

///////////////////////////////////////////////////////////////////

//GET
router.get(
  "/realtimeproducts",
  passport.authenticate("jwtAuth", {
    failureRedirect: "/session_destroyed",
    session: false,
  }),
  authorize(role),
  async (req, res) => {
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
        res.redirect("/session_destroyed");
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }
);

export { router as realTimeProducts };
