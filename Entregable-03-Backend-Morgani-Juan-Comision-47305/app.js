import express from "express";
import { ProductManagerFs } from "./src/productManager-FS/ProductManager-FS.js";

const productItems = new ProductManagerFs("./src/files/products.json");

const port = 8080;
const app = express();

app.listen(port, () => console.log("Servidor en funcionamiento."));

app.get("/products", async (req, res) => {
  try {
    const products = await productItems.getProducts();
    const limit = req.query.limit;
    +limit;
    const productsSlice = products.slice(0, limit);
    limit ? res.send(productsSlice) : res.send(products);
  } catch (error) {
    res.send(error.message);
  }
});

app.get("/products/:pId", async (req, res) => {
  const products = await productItems.getProducts();
  const Id = req.params.pId;
  const product = products.find((p) => p.Id === +Id);
  product ? res.send(product) : res.send("El producto no existe.");
});
