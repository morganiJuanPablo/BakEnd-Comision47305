//
import winston from "winston";
import { __dirname } from "../utils.js";
import path from "path";
import { generalConfig } from "../config/generalConfig.js";

//Logger para el entorno de desarrollo
const loggerDev = winston.createLogger({
  transports: [new winston.transports.Console({ level: "debug" })],
});

//Logger para el entorno de producción
const loggerProd = winston.createLogger({
  //Definimos el sistema de almacenamiento de los logs
  transports: [
    new winston.transports.Console({ level: "info" }),
    new winston.transports.File({
      filename: path.join(__dirname, "/logs/errors.log"),
      level: "error",
    }),
  ],
});

let logger;
if (generalConfig.environment.persistence === "development") {
  logger = loggerDev;
} else {
  logger = loggerProd;
}

export { logger };
