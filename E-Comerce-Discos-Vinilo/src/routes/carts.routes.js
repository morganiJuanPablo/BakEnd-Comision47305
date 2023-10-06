//
import { Router } from "express";
const router = Router();
import { mongoCartItem } from "../dao/index.js";

//GET
router.get("/carts", async (req, res) => {
  try {
    const carts = await mongoCartItem.getCarts();
    res.json({ status: "success", data: carts });
  } catch (error) {
    res.json({ Error: error.message });
  }
});

router.get("/cart/:idCart", async (req, res) => {
  try {
    const idCart = req.params.idCart;
    const cart = await mongoCartItem.getCartById(idCart);
    res.json({ data: cart });
  } catch (error) {
    res.json({ Error: error.message });
  }
});

//POST
router.post("/cart", async (req, res) => {
  try {
    const newCart = await mongoCartItem.createCart();
    res.json({
      status: "success",
      message: "Carrito creado con éxito.",
      data: newCart,
    });
  } catch (error) {
    res.json({ Error: error.message });
  }
});

//PUT
router.put("/cart/:cartId/product/:productId", async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const productId = req.params.productId;
    const cart = await mongoCartItem.addProduct(cartId, productId);
    res.json({ message: "Producto agregado al carrito", data: cart });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

//DELETE
router.delete("/cart/:idCart", async (req, res) => {
  try {
    const idCart = req.params.idCart;
    const cart = await mongoCartItem.deleteCartById(idCart);
    res.json({ status: "success", message: "Carrito eliminado con éxito." });
  } catch (error) {
    res.json({ Error: error.message });
  }
});

export { router as cartsRouter };
