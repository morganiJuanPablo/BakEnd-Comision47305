//
import { Router } from "express";
import { CartsController } from "../controller/carts.controller.js";
import { tokenAuth } from "../middleware/middleware.js";
import { onlyUserAcess } from "../middleware/middleware.js";

const router = Router();

///////////////////////////////////////////////////////////////////

//GET
router.get(
  "/cart/:cartId",
  tokenAuth,
  onlyUserAcess(),
  CartsController.getCartById
);

///////////////////////////////////////////////////////////////////

//GET
router.get(
  "/cart/:cartId/purchase",
  tokenAuth,  
  CartsController.getPurchase
);

///////////////////////////////////////////////////////////////////

//POST
router.post("/cart/:cartId/product/:productId", CartsController.addProduct);

///////////////////////////////////////////////////////////////////
//POST
router.post("/cart/:cartId/purchase", tokenAuth, CartsController.purchaseCart);

///////////////////////////////////////////////////////////////////

/* //PUT
router.put("/cart/:cartId/product/:productId", async (req, res) => {
  try {
    const quantity = req.body.quantity;
    const cartId = req.params.cartId;
    const productId = req.params.productId;
    const cart = await mongoCartItem.quantityModificated(
      cartId,
      productId,
      quantity
    );
    res.json({
      status: "success",
      message: "Se cambió la cantidad del producto.",
      data: cart,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}); */

///////////////////////////////////////////////////////////////////

//DELETE
router.delete(
  "/cart/:cartId/product/:productId",
  CartsController.deleteProduct
);

///////////////////////////////////////////////////////////////////

//DELETE
router.delete("/cart/:cartId", CartsController.deleteAllProducts);

///////////////////////////////////////////////////////////////////

export { router as cartsRouter };
