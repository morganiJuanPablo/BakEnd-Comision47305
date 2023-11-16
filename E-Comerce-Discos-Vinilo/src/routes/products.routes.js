//
import { Router } from "express";
import { ProductsController } from "../controller/products.controller.js";
import { tokenAuth } from "../middleware/middleware.js";

const router = Router();

//GET
///////////////////////////////////////////////////////////////////
router.get("/products/:category", tokenAuth, ProductsController.getProducts);

///////////////////////////////////////////////////////////////////
router.get("/item/:productId", tokenAuth, ProductsController.getProductsById);

//POST
///////////////////////////////////////////////////////////////////
router.post("/products/:category", (req, res) => {
  const sort = req.body.sort;
  console.log(sort);
});

///////////////////////////////////////////////////////////////////

export { router as productsRouter };
