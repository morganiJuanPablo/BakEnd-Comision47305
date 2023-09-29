import { ProductsManagerFs } from "./ProductsManager-FS.js";
import { __dirname } from "../utils.js";
import path from "path";

export const productsItem = new ProductsManagerFs(
  path.join(__dirname, "persistence/files/products.json")
);


