//
import { Router } from "express";
import { productsItem } from "../persistence/index.js";

const router = Router();

//GET
router.get("/", async (req, res) => {
  try {
    const products = await productsItem.getProducts();
    const data = {
      style: "home.css",
      products,
    };
    res.render("home", data);
  } catch (error) {
    res.json({ Error: error.message });
  }
});
/* 
router.get("/:IdProduct", async (req, res) => {
  try {
    const IdProduct = req.params.IdProduct;
    const product = await productsItem.getProductById(IdProduct);
    res.json({ data: product });
  } catch (error) {
    res.json({ Error: error.message });
  }
}); */

/* router.get("/", async (req, res) => {
  try {
    const products = await productsItem.getProducts();
    const limit = req.query.limit;
    +limit;
    const productsSlice = products.slice(0, limit);
    limit ? res.json({ productsSlice }) : res.json({ products });
  } catch (error) {
    res.send(error.message);
  }
}); */

export { router as productsRouter };
