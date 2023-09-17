//
import { Router } from "express";
import { productsItem } from "../persistence/index.js";
const router = Router();

//GET
router.get("/realTimeProducts", async (req, res) => {
  try {
    res.render("realTimeProducts", { style: "realTimeProducts.css" });
  } catch (error) {
    res.json({ Error: error.message });
  }
});




/* //POST

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
}); */

export { router as realTimeProducts };
