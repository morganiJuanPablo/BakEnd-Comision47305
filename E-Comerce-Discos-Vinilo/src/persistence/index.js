import { ProductsManagerFs } from "./ProductsManager-FS.js";
import { CartsManagerFs } from "./CartsManagerFs.js";
import { __dirname } from "../utils.js";
import path from "path";

export const productsItem = new ProductsManagerFs(
  path.join(__dirname, "persistence/files/products.json")
);
export const cartsItem = new CartsManagerFs(
  path.join(__dirname, "persistence/files/carts.json")
);

