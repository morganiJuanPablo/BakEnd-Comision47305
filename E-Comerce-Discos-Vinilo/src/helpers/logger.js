//
import winston from "winston";

const loggerDev = winston.createLogger({
  //Definimos el sistema de almacenamiento de los logs
  transports: [new winston.transports.Console({ level: "debug" })],
});
const loggerProd = winston.createLogger({
  //Definimos el sistema de almacenamiento de los logs
  transports: [new winston.transports.Console({ level: "info" })],
});

export { loggerDev, loggerProd };
