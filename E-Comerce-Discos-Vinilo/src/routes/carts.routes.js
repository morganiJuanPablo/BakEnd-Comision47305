//
import { Router } from "express";
import { cartsItem } from "../persistence/index.js";

const router = Router();

//POST
router.post("/", async (req, res) => {
  try {
    await cartsItem.createCart();
    res.json({ message: "Carrito creado con éxito." });
  } catch (error) {
    res.json({ Error: error.message });
  }
});

router.post("/:IdCart/products/:IdProduct", async (req, res) => {
  try {
    const IdCart = req.params.IdCart;
    const IdProduct = req.params.IdProduct;
    await cartsItem.addProductToCart(IdCart, IdProduct);
    res.json({
      message: `Producto añadido con éxito al carrito con id: ${IdCart}.`,
    });
  } catch (error) {
    res.json({ Error: error.message });
  }
});

//GET
router.get("/", async (req, res) => {
  try {
    const carts = await cartsItem.getCarts();
    res.json({ data: carts });
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.get("/:IdCart", async (req, res) => {
  try {
    const IdCart = await req.params.IdCart;
    const cart = await cartsItem.getCartById(IdCart);
    res.json({ products: cart });
  } catch (error) {
    res.json({ Error: error.message });
  }
});

//DELETE
router.delete("/:IdCart", async (req, res) => {
  try {
    const IdCart = req.params.IdCart;
    await cartsItem.deleteCartById(IdCart);
    res.json({ message: "Carrito eliminado exitosamente." });
  } catch (error) {
    res.json({ Error: error.message });
  }
});

export { router as cartsRouter };
