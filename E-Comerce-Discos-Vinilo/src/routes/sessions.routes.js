//
import { Router } from "express";
import { generalConfig } from "../config/generalConfig.js";
import passport from "passport";
import { SessionsController } from "../controller/sessions.controller.js";
import {
  tokenAuth,
  authRegisterPassport,
  authLoginPassport,
} from "../middleware/middleware.js";

const router = Router();

////GET
///////////////////////////////////////////////////////////////////
router.get("/login", SessionsController.loginView);

///////////////////////////////////////////////////////////////////
router.get("/login_fail", SessionsController.loginFailView);

///////////////////////////////////////////////////////////////////
router.get("/new_user", SessionsController.newUserView);

///////////////////////////////////////////////////////////////////
router.get(
  "/generate_new_password",
  SessionsController.generateNewPasswordView
);

///////////////////////////////////////////////////////////////////
router.get("/link_new_password", SessionsController.linkNewPasswordView);

///////////////////////////////////////////////////////////////////
router.get("/new_user_fail", SessionsController.newUserFailView);

///////////////////////////////////////////////////////////////////
router.get("/profile", tokenAuth, SessionsController.profileView);

///////////////////////////////////////////////////////////////////
router.get("/session_destroyed", SessionsController.sessionDestroyedView);

///////////////////////////////////////////////////////////////////
router.get("/unauthorized", SessionsController.unauthorizedView);

///////////////////////////////////////////////////////////////////
router.get("/logout", SessionsController.logout);

///////////////////////////////////////////////////////////////////GITHUB
router.get("/github_new_user", passport.authenticate("githubRegisterStrategy"));
router.get(
  generalConfig.github.callbackUrl,
  passport.authenticate("githubRegisterStrategy", {
    failureRedirect: "/api/session/login",
    session: false,
  }),
  SessionsController.newSessionGitHub
);

///////////////////////////////////////////////////////////////////GOOGLE
router.get("/google/new_user", passport.authenticate("googleRegisterStrategy"));
router.get(
  generalConfig.google.callbackUrl,
  passport.authenticate("googleRegisterStrategy", {
    failureRedirect: "/api/session/login",
    session: false,
  }),
  SessionsController.newSessionGoogle
);

////POST
///////////////////////////////////////////////////////////////////
router.post(
  "/new_user",
  authRegisterPassport,
  SessionsController.generateNewUser
);

///////////////////////////////////////////////////////////////////
router.post("/login", authLoginPassport, SessionsController.loginUser);

///////////////////////////////////////////////////////////////////
router.post("/link_new_password", SessionsController.linkNewPassword);

///////////////////////////////////////////////////////////////////
router.post(
  "/generate_new_password",
  SessionsController.generateNewPassword
);

///////////////////////////////////////////////////////////////////

export { router as sessionsRouter };
