//
import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    mongoose.connect(
      "mongodb+srv://morganijuanpablo:XgMe7LjudVbQGoKJ@juampidb.wigsasz.mongodb.net/ecomerceDB?retryWrites=true&w=majority"
    );
    console.log("Conectado con la base de datos.");
  } catch (error) {
    console.log("Error al conectarse con la base de datos.", error.message);
  }
};
