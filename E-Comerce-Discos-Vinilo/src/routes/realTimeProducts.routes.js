//
import { Router } from "express";
import passport from "passport";
import { authorize, roleClient } from "../utils.js";
import { realTimeProductsController } from "../controller/realTimeProducts.controller.js";

let role = roleClient();
const router = Router();

///////////////////////////////////////////////////////////////////

//GET
router.get(
  "/realtimeproducts",
  passport.authenticate("jwtAuth", {
    failureRedirect: "/api/session/session_destroyed",
    session: false,
  }),
  authorize(role),
  realTimeProductsController.renderRealTimeProductsView
);

///////////////////////////////////////////////////////////////////

export { router as realTimeProducts };
