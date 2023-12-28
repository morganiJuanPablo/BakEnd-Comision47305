//
import { Router } from "express";
import { checkRole, tokenAuth } from "../middleware/middleware.js";
import { realTimeProductsController } from "../controller/realTimeProducts.controller.js";

const router = Router();

//GET
///////////////////////////////////////////////////////////////////
router.get(
  "/realtimeproducts",
  tokenAuth,
  checkRole(["Administrador", "Usuario"]),
  realTimeProductsController.renderRealTimeProductsView
);

///////////////////////////////////////////////////////////////////

export { router as realTimeProducts };
