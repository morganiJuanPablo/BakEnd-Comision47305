//
import { Router } from "express";
const router = Router();
import { mongoProductsItem } from "../dao/index.js";

//GET
router.get("/", async (req, res) => {
  try {
    const products = await mongoProductsItem.getProducts();
    const data = {
      style: "home.css",
      products,
    };
    res.render("home", data);
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
  }
});

export { router as productsRouter };
