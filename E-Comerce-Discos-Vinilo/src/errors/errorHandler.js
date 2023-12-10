//
import { EError } from "./Enums/EError.js";
import { logger } from "../helpers/logger.js";

export const errorHandler = (error, req, res, next) => {
  logger.error(error.message);
  switch (error.code) {
    case EError.DATABASE_Error:
      res.json({ status: "error", error: error.cause });
      logger.error(error.message);
      break;
    case EError.AUTH_Error:
      res.json({ status: "error", error: error.cause });
      logger.error(error.message);
      break;
    default:
      res.json({ status: "error", error: "Unhandled Error" });
      break;
  }
  next()
};
