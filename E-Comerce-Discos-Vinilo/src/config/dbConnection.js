//
import { generalConfig } from "./generalConfig.js";
import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    mongoose.connect(generalConfig.mongo.url);    
    console.log("Conectado con la base de datos.");
  } catch (error) {
    console.log("Error al conectarse con la base de datos.", error.message);
  }
};
