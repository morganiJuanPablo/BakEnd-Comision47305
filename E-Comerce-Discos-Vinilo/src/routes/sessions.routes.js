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
router.get("/login", SessionsController.renderLoginView);

///////////////////////////////////////////////////////////////////
router.get("/login_fail", SessionsController.renderLoginfailView);

///////////////////////////////////////////////////////////////////
router.get("/new_user", SessionsController.renderNewUserView);

///////////////////////////////////////////////////////////////////
router.get("/new_user_fail", SessionsController.renderNewUserFailView);

///////////////////////////////////////////////////////////////////
router.get("/profile", tokenAuth, SessionsController.renderProfileView);

///////////////////////////////////////////////////////////////////
router.get("/session_destroyed", SessionsController.renderSessionDestroyedView);

///////////////////////////////////////////////////////////////////
router.get("/unauthorized", SessionsController.renderUnauthorizedView);

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
  SessionsController.redirectLoginNewUser
),
  ///////////////////////////////////////////////////////////////////
  router.post("/login", authLoginPassport, SessionsController.newSessionUser);

///////////////////////////////////////////////////////////////////

export { router as sessionsRouter };