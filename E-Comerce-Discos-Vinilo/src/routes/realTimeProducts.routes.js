//
import { Router } from "express";
import { authorize, roleClient, tokenAuth } from "../middleware/middleware.js";
import { realTimeProductsController } from "../controller/realTimeProducts.controller.js";

let role = roleClient();
const router = Router();

//GET
///////////////////////////////////////////////////////////////////
router.get(
  "/realtimeproducts",
  tokenAuth,
  authorize(role),
  realTimeProductsController.renderRealTimeProductsView
);

///////////////////////////////////////////////////////////////////

export { router as realTimeProducts };
