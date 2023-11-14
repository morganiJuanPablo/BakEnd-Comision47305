//
import { Router } from "express";
import passport from "passport";
import { ProductsController } from "../controller/products.controller.js";

const router = Router();

///////////////////////////////////////////////////////////////////

//GET
router.get(
  "/products/:category",
  passport.authenticate("jwtAuth", {
    failureRedirect: "/api/session/session_destroyed",
    session: false,
  }),
  ProductsController.getProducts_controller
);

///////////////////////////////////////////////////////////////////

//GET
router.get(
  "/item/:productId",
  passport.authenticate("jwtAuth", {
    failureRedirect: "/api/session/session_destroyed",
    session: false,
  }),
  ProductsController.getProductsById_controller
);

///////////////////////////////////////////////////////////////////

//GET
router.get(
  "/products/:category/sort_asc",
  ProductsController.getProductsSort_controller
);

///////////////////////////////////////////////////////////////////

export { router as productsRouter };
