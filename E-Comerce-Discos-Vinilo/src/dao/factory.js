//
import { generalConfig } from "../config/generalConfig.js";
import { __dirname } from "../utils.js";
import path from "path";
import { UsersManagerMongo } from "./mongoManagers/UsersManagerMongo.js";

let productsDao;
let chatsDao;
let cartsDao;
let usersDao;
const environment = generalConfig.environment.persistence;

switch (environment) {
  ////////////////////////////////////////////////////////////
  case "production": {
    ////MONGO DB
    const { DbConnection } = await import("../config/dbConnection.js");
    DbConnection.getInstance();

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
      "../dao/mongoManagers/ChatManagerMongo.js"
    );
    chatsDao = new ChatManagerMongo();
    ////USERS
    /*     const { UsersManagerMongo } = await import(
      "../dao/mongoManagers/UsersManagerMongo.js"
    );
    usersDao = new UsersManagerMongo(); */
    ////
    usersDao = new UsersManagerMongo();
    console.log("Estamos en el entorno de Producción.");
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
    console.log("Estamos en el entorno de Desarrollo.");
    break;
  }
}

export { productsDao, cartsDao, chatsDao, usersDao };
