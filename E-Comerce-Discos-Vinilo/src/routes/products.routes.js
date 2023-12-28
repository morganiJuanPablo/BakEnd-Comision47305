//
import { Router } from "express";
import { ProductsController } from "../controller/products.controller.js";
import { tokenAuth } from "../middleware/middleware.js";
import { brotliConfig } from "../middleware/middleware.js";

const router = Router();

//GET
///////////////////////////////////////////////////////////////////
router.get(
  "/products/:category",
  brotliConfig,
  tokenAuth,
  ProductsController.getProducts
);

///////////////////////////////////////////////////////////////////
router.get("/item/:productId", tokenAuth, ProductsController.getProductsById);

///////////////////////////////////////////////////////////////////
router.post(
  "/mockingproducts",
  brotliConfig,
  /* tokenAuth,  */ ProductsController.postProductsMock
);

//POST
///////////////////////////////////////////////////////////////////
router.post("/products/:category", (req, res) => {
  const sort = req.body.sort;
});

///////////////////////////////////////////////////////////////////

export { router as productsRouter };
