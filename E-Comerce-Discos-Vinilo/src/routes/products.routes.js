//
import { Router } from "express";
import { productsItem } from "../persistence/index.js";

const router = Router();

//GET
router.get("/", async (req, res) => {
  try {
    const products = await productsItem.getProducts();
    res.json({ data: products });
  } catch (error) {
    res.json({ Error: error.message });
  }
});

router.get("/:IdProduct", async (req, res) => {
  try {
    const IdProduct = req.params.IdProduct;
    const product = await productsItem.getProductById(IdProduct);
    res.json({ data: product });
  } catch (error) {
    res.json({ Error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const products = await productsItem.getProducts();
    const limit = req.query.limit;
    +limit;
    const productsSlice = products.slice(0, limit);
    limit ? res.json({ productsSlice }) : res.json({ products });
  } catch (error) {
    res.send(error.message);
  }
});

//POST
router.post("/", async (req, res) => {
  try {
    const newProduct = req.body;
    await productsItem.addProduct(newProduct);
    res.json({ message: "Producto añadido con éxito." });
  } catch (error) {
    res.json({ Error: error.message });
  }
});

//DELETE
router.delete("/:IdProduct", async (req, res) => {
  try {
    const IdProduct = req.params.IdProduct;
    await productsItem.deleteProductById(IdProduct);
    res.json({ message: "Producto eliminado con éxito." });
  } catch (error) {
    res.json({ Error: error.message });
  }
});

//PUT
router.put("/:IdProduct", async (req, res) => {
  try {
    const IdProduct = req.params.IdProduct;
    const update = req.body;
    await productsItem.updateProduct(IdProduct, update);
    res.json({ message: "Producto actualizado con éxito." });
  } catch (error) {
    res.json({ Error: error.message });
  }
});

export { router as productsRouter };
