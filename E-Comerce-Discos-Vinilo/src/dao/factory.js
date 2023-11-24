//
import { generalConfig } from "../config/generalConfig.js";
import { __dirname } from "../utils.js";
import path from "path";

/* export const productsItem = new ProductsManagerFs(
  path.join(__dirname, "dao/files/products.json")
); */

/* export const mongoProductsItem = new ProductsManagerMongo();
export const mongoChatItem = new ChatManagerMongo();
export const mongoCartItem = new CartsManagerMongo();
export const mongoUserItem = new UsersManagerMongo(); */

let productsDao;
let chatsDao;
let cartsDao;
let usersDao;
const environment = generalConfig.environment.envWork;

switch (environment) {
  ////////////////////////////////////////////////////////////
  case "production": {
    ////MONGO DB
    const { DbConnection } = await import("../config/dbConnection.js");
    const dbConection = DbConnection.getInstance();

    ////PRODUCTS
    const { ProductsManagerMongo } = await import(
      "../dao/mongoManagers/ProductsManagerMongo.js"
    );
    productsDao = new ProductsManagerMongo();

    ////CARTS
    const { CartsManagerMongo } = await import(
      "../dao/mongoManagers/CartsManagerMongo.js"
    );
    cartsDao = new CartsManagerMongo();

    ////CHATS
    const { ChatManagerMongo } = await import(
      "./mongoManagers/ChatManagerMongo.js"
    );
    chatsDao = new ChatManagerMongo();

    ////USERS
    const { UsersManagerMongo } = await import(
      "../dao/mongoManagers/UsersManagerMongo.js"
    );
    usersDao = new UsersManagerMongo();

    ////
    console.log("Estamos en producción");
    break;
  }
  ////////////////////////////////////////////////////////////
  case "development": {
    ////PRODUCTS
    const { ProductsManagerFs } = await import(
      "../dao/fileSystemManagers/ProductsManager-FS.js"
    );
    productsDao = new ProductsManagerFs(
      path.join(__dirname, "dao/files/products.json")
    );

    ////CARTS
    const { CartsManagerFs } = await import(
      "../dao/fileSystemManagers/CartsManagerFs.js"
    );
    cartsDao = new CartsManagerFs((__dirname, "dao/files/carts.json"));

    ////
    console.log("Estamos en desarrollo");
    break;
  }
}

export { productsDao, cartsDao, chatsDao, usersDao };
