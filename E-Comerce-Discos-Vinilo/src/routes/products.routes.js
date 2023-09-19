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


export { router as productsRouter };
