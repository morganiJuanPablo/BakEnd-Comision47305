//
import { Router } from "express";
import { mongoProductsItem } from "../dao/index.js";
const router = Router();



//GET
router.get("/", async (req, res) => {
  try {
    const products = await mongoProductsItem.getProducts();
    const processedData = products.map((item) => ({
      title: item.title,
      price: item.price,
      thumbnail: item.thumbnail,
    }));
    const data = {
      style: "home.css",
      processedData,
    };
    
    res.render("home", data);
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
  }
});

export { router as productsRouter };
