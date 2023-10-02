import { ProductsManagerFs } from "./ProductsManager-FS.js";
import { ProductsManagerMongo } from "./mongoManagers/ProductsManagerMongo.js";
import { __dirname } from "../utils.js";
import path from "path";

export const productsItem = new ProductsManagerFs(
  path.join(__dirname, "dao/files/products.json")
);

export const mongoProductsItem = new ProductsManagerMongo()
