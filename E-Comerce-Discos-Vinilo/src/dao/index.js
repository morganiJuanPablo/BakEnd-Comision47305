//
import { ProductsManagerFs } from "./fileSystemManagers/ProductsManager-FS.js";
import { __dirname } from "../utils.js";
import path from "path";
import { ProductsManagerMongo } from "./mongoManagers/ProductsManagerMongo.js";
import { ChatManagerMongo } from "./mongoManagers/ChatManagerMongo.js";
import { CartsManagerMongo } from "./mongoManagers/CartsManagerMongo.js";
import { UsersManagerMongo } from "./mongoManagers/UsersManagerMongo.js";

export const productsItem = new ProductsManagerFs(
  path.join(__dirname, "dao/files/products.json")
);

export const mongoProductsItem = new ProductsManagerMongo();
export const mongoChatItem = new ChatManagerMongo();
export const mongoCartItem = new CartsManagerMongo();
export const mongoUserItem = new UsersManagerMongo();
