//
import { Router } from "express";
import passport from "passport";
import { ProductsController } from "../controller/products.controller.js";

const router = Router();

//GET
///////////////////////////////////////////////////////////////////
router.get(
  "/products/:category",
  passport.authenticate("jwtAuth", {
    failureRedirect: "/api/session/session_destroyed",
    session: false,
  }),
  ProductsController.getProducts
);

///////////////////////////////////////////////////////////////////
router.get(
  "/item/:productId",
  passport.authenticate("jwtAuth", {
    failureRedirect: "/api/session/session_destroyed",
    session: false,
  }),
  ProductsController.getProductsById
);

///////////////////////////////////////////////////////////////////

export { router as productsRouter };
