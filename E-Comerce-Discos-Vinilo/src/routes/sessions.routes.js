//
import { Router } from "express";
import { generalConfig } from "../config/generalConfig.js";
import passport from "passport";
const router = Router();

///////////////////////////////////////////////////////////////////

//POST
router.post(
  "/new_user",
  passport.authenticate("localRegisterStrategy", {
    failureRedirect: "/new_user_fail",
  }),
  async (req, res) => {
    try {
      const data = {
        style: "login.css",
        message: `🤟Felicidades ${req.user.first_name}, estás dentro🤟`,
      };
      res.render("login", data);
    } catch (error) {
      res.render("login", { Error: error.message });
    }
  }
);

///////////////////////////////////////////////////////////////////

//POST
router.post(
  "/login",
  passport.authenticate("localLoginStrategy", {
    failureRedirect: "/login_fail",
  }),
  async (req, res) => {
    try {
      res.redirect("/products/inicio");
    } catch (error) {
      const data = {
        style: "login.css",
        error: "No se pudo iniciar la sesión",
      };
      res.render("login", data);
    }
  }
);

///////////////////////////////////////////////////////////////////GITHUB

router.get("/github_new_user", passport.authenticate("githubRegisterStrategy"));

router.get(
  generalConfig.github.callbackUrl,
  passport.authenticate("githubRegisterStrategy", {
    failureRedirect: "api/session/github_new_user_fail",
  }),
  (req, res) => {
    res.redirect("/products/inicio");
  }
);

///////////////////////////////////////////////////////////////////GOOGLE

router.get("/google/new_user", passport.authenticate("googleRegisterStrategy"));

router.get(
  generalConfig.google.callbackUrl,
  passport.authenticate("googleRegisterStrategy", {
    failureRedirect: "/login",
  }),
  (req, res) => {
    res.redirect("/products/inicio");
  }
);

export { router as sessionsRouter };
