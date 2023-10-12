//
import { Router } from "express";
import { mongoCartItem } from "../dao/index.js";
const router = Router();

///////////////////////////////////////////////////////////////////

//GET

router.get("/carts", async (req, res) => {
  try {
    const carts = await mongoCartItem.getCarts();
    res.json({ status: "success", data: carts });
  } catch (error) {
    res.json({ Error: error.message });
  }
});

router.get("/cart/:cartId", async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const cart = await mongoCartItem.getCartById(cartId);
    const data = {
      style: "cart.css",
      products: cart.products,
    };
    /* res.json({ status: "success", data: cart }); */
    res.render("cart", data);
  } catch (error) {
    res.json({ Error: error.message });
  }
});

///////////////////////////////////////////////////////////////////

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

router.post("/cart/:cartId/product/:productId", async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const productId = req.params.productId;
    const cart = await mongoCartItem.getCartById(cartId);
    const newCart = await mongoCartItem.addProduct(cartId, productId);
    res.json({
      status: "success",
      message: "Producto agregado al carrito",
      data: newCart,
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

///////////////////////////////////////////////////////////////////

//PUT

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
    res.json({ status: "error", message: error.message });
  }
});

///////////////////////////////////////////////////////////////////

//DELETE

/* router.delete("/cart/:cartId", async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const cart = await mongoCartItem.deleteCartById(cartId);
    res.json({
      status: "success",
      message: `Carrito con Id: ${cartId} eliminado con éxito.`,
    });
  } catch (error) {
    res.json({ status: "error",error: error.message });
  }
}); */

router.delete("/cart/:cartId/product/:productId", async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const productId = req.params.productId;
    const cart = await mongoCartItem.newCartWithoutProduct(cartId, productId);
    res.json({
      status: "success",
      message: "Producto eliminado del carrito",
      data: cart,
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

router.delete("/cart/:cartId", async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const cart = await mongoCartItem.deleteAllProducts(cartId);
    res.json({
      status: "success",
      message: `Carrito con Id: ${cartId} vaciado con éxito.`,
      data: cart,
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

export { router as cartsRouter };
