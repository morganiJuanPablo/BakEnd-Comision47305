//
import { ProductsManagerFs } from "./ProductsManager-FS.js";
import { __dirname } from "../utils.js";
import path from "path";
import { ProductsManagerMongo } from "./mongoManagers/ProductsManagerMongo.js";
import { ChatManagerMongo } from "./mongoManagers/ChatManagerMongo.js";

export const productsItem = new ProductsManagerFs(
  path.join(__dirname, "dao/files/products.json")
);

export const mongoProductsItem = new ProductsManagerMongo();
export const mongoChatItem = new ChatManagerMongo();
