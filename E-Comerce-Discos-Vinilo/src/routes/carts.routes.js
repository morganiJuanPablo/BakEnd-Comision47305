//
import { Router } from "express";
import passport from "passport";
import { CartsController } from "../controller/carts.controller.js";

const router = Router();

///////////////////////////////////////////////////////////////////

//GET
router.get(
  "/cart/:cartId",
  passport.authenticate("jwtAuth", {
    failureRedirect: "/session_destroyed",
    session: false,
  }),
  CartsController.getCartById
);

///////////////////////////////////////////////////////////////////

//POST
router.post(
  "/cart/:cartId/product/:productId",
  CartsController.addProduct
);

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
