//
import { generalConfig } from "../config/generalConfig.js";
import { __dirname } from "../utils.js";
import path from "path";
import { logger } from "../helpers/logger.js";

let productsDao;
let chatsDao;
let cartsDao;
let usersDao;
let ticketsDao;
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
    const { UsersManagerMongo } = await import(
      "../dao/mongoManagers/UsersManagerMongo.js"
    );
    usersDao = new UsersManagerMongo(); 

    ////TICKETS
    const { TicketsManagerMongo } = await import(
      "../dao/mongoManagers/TicketsManagerMongo.js"
    );
    ticketsDao = new TicketsManagerMongo();

    logger.info("Estamos en el entorno de Producción.");
    break;
  }
  ////////////////////////////////////////////////////////////
  case "development": {
    ////PRODUCTS
    const { ProductsManagerFs } = await import(
      "../dao/fileSystemManagers/ProductsManager-FS.js"
    );
    productsDao = new ProductsManagerFs(
      path.join(__dirname, "./dao/fileSystemManagers/files/products.json")
    );

    ////CARTS
    const { CartsManagerFs } = await import(
      "../dao/fileSystemManagers/CartsManager-FS.js"
    );
    cartsDao = new CartsManagerFs(
      path.join(__dirname, "./dao/fileSystemManagers/files/carts.json")
    );

    ////USERS
    const { UsersManagerFs } = await import(
      "../dao/fileSystemManagers/UsersManager-FS.js"
    );
    usersDao = new UsersManagerFs(
      path.join(__dirname, "./dao/fileSystemManagers/files/users.json")
    );

    ////
    logger.info("Estamos en el entorno de Desarrollo.");
    break;
  }
}

export { productsDao, cartsDao, chatsDao, usersDao, ticketsDao };
