//
import winston from "winston";
import { __dirname } from "../utils.js";
import path from "path";
import { generalConfig } from "../config/generalConfig.js";
import chalk from "chalk";

// Función para colorear los niveles de registro
const colorizeLevel = winston.format((info) => {
  const { level } = info;
  switch (level) {
    case "info":
      info.level = chalk.yellow(level);
      break;
    case "warn":
      info.level = chalk.orange(level);
      break;
    case "error":
      info.level = chalk.red(level);
      break;
    default:
      break;
  }
  return info;
});

// Logger para el entorno de desarrollo
const loggerDev = winston.createLogger({
  format: winston.format.combine(colorizeLevel(), winston.format.simple()),
  transports: [new winston.transports.Console({ level: "debug" })],
});

// Logger para el entorno de producción
const loggerProd = winston.createLogger({
  format: winston.format.combine(colorizeLevel(), winston.format.simple()),
  // Definimos el sistema de almacenamiento de los logs
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
