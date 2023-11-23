//
import { Router } from "express";
import { onlyAdminAcess, tokenAuth } from "../middleware/middleware.js";
import { realTimeProductsController } from "../controller/realTimeProducts.controller.js";

const router = Router();

//GET
///////////////////////////////////////////////////////////////////
router.get(
  "/realtimeproducts",
  tokenAuth,
  onlyAdminAcess(),
  realTimeProductsController.renderRealTimeProductsView
);

///////////////////////////////////////////////////////////////////

export { router as realTimeProducts };
