//
import { Router } from "express";
import { ProductsController } from "../controller/products.controller.js";
import { tokenAuth } from "../middleware/middleware.js";
import { brotliConfig } from "../middleware/middleware.js";
import { logger } from "../helpers/logger.js";

const router = Router();

//RUTA PARA PROBAR LOGGERS SEGUN ENTORNO DE TRABAJO
router.get("/loggerTest", (req, res) => {
  logger.debug("Soy un mensaje DEBUG");
  logger.verbose("Soy un mensaje VERBOSE");
  logger.http("Soy un mensaje HTTP");
  logger.info("Soy un mensaje INFO");
  logger.warn("Soy un mensaje WARN");
  logger.error("Error fatal")
  res.json({ status: "success", message: "Petición recibida" });
});

//GET
///////////////////////////////////////////////////////////////////
router.get(
  "/products/:category",
  brotliConfig,
  /* tokenAuth, */
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
