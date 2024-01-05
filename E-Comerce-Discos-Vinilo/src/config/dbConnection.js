//
import { generalConfig } from "./generalConfig.js";
import mongoose from "mongoose";
import { logger } from "../helpers/logger.js";

//Configuración para la base de datos en entorno de PRODUCCCIÓN
export class DbConnection {
  static #instance;

  static async #getConnection() {
    const connection = await mongoose.connect(
      generalConfig.mongo.urlProduction
    );
    logger.info("Conectado con la base de datos. <<Entorno de producción>>");
    return connection;
  }
  static async getInstance() {
    if (this.#instance) {
      logger.warn("La conexión con la base de datos ya existe.");
      return this.#instance;
    } else {
      this.#instance = await this.#getConnection();
      return this.#instance;
    }
  }
}

//Configuración para la base de datos en entorno de DESARROLLO Y PRUEBAS
export class DbConnectionDev {
  static #instance;

  static async #getConnection() {
    const connection = await mongoose.connect(generalConfig.mongo.urlDevTest);
    logger.info(
      "Conectado con la base de datos. <<Entorno de desarrollo y pruebas>>"
    );
    return connection;
  }
  static async getInstance() {
    if (this.#instance) {
      logger.warn("La conexión con la base de datos ya existe.");
      return this.#instance;
    } else {
      this.#instance = await this.#getConnection();
      return this.#instance;
    }
  }
}
