//
import { Router } from "express";
import { mongoCartItem } from "../dao/index.js";
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
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }
);

///////////////////////////////////////////////////////////////////

//GET
router.get(
  "/cart/:cartId",
  passport.authenticate("jwtAuth", {
    failureRedirect: "/session_destroyed",
    session: false,
  }),
  async (req, res) => {
    try {
      if (req.user?.email) {
        const cartId = req.user.cartId;
        const cart = await mongoCartItem.getCartById(cartId);
        const sessionExist = req.user.email && true;
        const data = {
          sessionExist,
          cartId,
          style: "cart.css",
          products: cart.products,
          userFirstName: req.user.name,
        };
        console.log(data);
        res.render("cart", data);
        /* res.json({ status: "success", data: cart }); */
      } else {
        res.redirect("/session_destroyed");
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
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
    console.log(error.message);
    res.status(500).json({ message: error.message });
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
    console.log(error.message);
    res.status(500).json({ message: error.message });
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
    console.log(error.message);
    res.status(500).json({ message: error.message });
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
    console.log(error.message);
    res.status(500).json({ message: error.message });
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
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

export { router as cartsRouter };
