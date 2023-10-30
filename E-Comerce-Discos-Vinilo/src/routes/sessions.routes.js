//
import { Router } from "express";
import { generalConfig } from "../config/generalConfig.js";
import passport from "passport";
const router = Router();
import { generateToken } from "../utils.js";

///////////////////////////////////////////////////////////////////

//POST
router.post(
  "/new_user",
  passport.authenticate("localRegisterStrategy", {
    failureRedirect: "/new_user_fail",
    session: false,
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
    session: false,
  }),
  async (req, res) => {
    try {
      const user = req.user;
      const token = generateToken(user);
      res.cookie("authLogin", token, { maxAge: 3600000, httpOnly: true });
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
    session: false,
  }),
  (req, res) => {
    const user = req.user;
    const token = generateToken(user);
    res.cookie("authLogin", token, { maxAge: 3600000, httpOnly: true });
    res.redirect("/products/inicio");
  }
);

///////////////////////////////////////////////////////////////////GOOGLE

router.get("/google/new_user", passport.authenticate("googleRegisterStrategy"));

router.get(
  generalConfig.google.callbackUrl,
  passport.authenticate("googleRegisterStrategy", {
    failureRedirect: "/login",
    session: false,
  }),
  (req, res) => {
    const user = req.user;
    const token = generateToken(user);
    res.cookie("authLogin", token, { maxAge: 3600000, httpOnly: true });
    res.redirect("/products/inicio");
  }
);

export { router as sessionsRouter };
