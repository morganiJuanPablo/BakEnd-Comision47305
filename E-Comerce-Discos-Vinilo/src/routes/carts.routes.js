//
import { Router } from "express";
import { mongoCartItem } from "../dao/index.js";
import { roleClient } from "../utils.js";
import passport from "passport";
const router = Router();

///////////////////////////////////////////////////////////////////

//GET
router.get(
  "/carts",
  passport.authenticate("jwtAuth", { session: false }),
  async (req, res) => {
    try {
      if (req.user?.email) {
        const carts = await mongoCartItem.getCarts();
        res.json({ status: "success", data: carts });
      } else {
        res.redirect("/session_destroyed");
      }
    } catch (error) {
      res.json({ Error: error.message });
    }
  }
);

///////////////////////////////////////////////////////////////////

//GET
router.get(
  "/cart/:cartId",
  passport.authenticate("jwtAuth", { session: false }),
  async (req, res) => {
    try {
      if (req.user?.email) {
        const cartId = req.params.cartId;
        const cart = await mongoCartItem.getCartById(cartId);
        const role = roleClient(req);
        const isAdmin = req.user.role === "Administrador" && true;
        const data = {
          isAdmin,
          role,
          style: "cart.css",
          products: cart.products,
          userFirstName: req.user.name,
        };
        /* res.json({ status: "success", data: cart }); */
        res.render("cart", data);
      } else {
        res.redirect("/session_destroyed");
      }
    } catch (error) {
      res.json({ Error: error.message });
    }
  }
);

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

///////////////////////////////////////////////////////////////////

//POST
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

///////////////////////////////////////////////////////////////////

//DELETE
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

///////////////////////////////////////////////////////////////////

//DELETE
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
