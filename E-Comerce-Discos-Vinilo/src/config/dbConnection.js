//
import { generalConfig } from "./generalConfig.js";
import mongoose from "mongoose";

export class DbConnection {
  static #instance;

   static async #getConnection() {
    const connection = await mongoose.connect(generalConfig.mongo.url);
    console.log("Conectado con la base de datos.");
    return connection;
  }
  static async getInstance() {
    if (this.#instance) {
      console.log("La conexión con la base de datos ya existe.");
      return this.#instance;
    } else {
      this.#instance = await this.#getConnection();
      return this.#instance;
    }
  }
}
