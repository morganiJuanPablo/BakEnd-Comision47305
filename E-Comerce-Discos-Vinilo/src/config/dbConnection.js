//
import { generalConfig } from "./generalConfig.js";
import mongoose from "mongoose";

export class DbConnection {
  static #instance;

  static #getConnection() {
    const connection = mongoose.connect(generalConfig.mongo.url);
    console.log("Conectado con la base de datos.");
    return connection;
  }
  static getInstance() {
    if (this.#instance) {
      console.log("La conexión con la base de datos ya existe.");
      return this.#instance;
    } else {
      this.#instance = this.#getConnection();
      return this.#instance;
    }
  }
}

