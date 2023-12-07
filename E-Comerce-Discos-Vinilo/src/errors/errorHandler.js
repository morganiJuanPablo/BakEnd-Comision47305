//
import { EError } from "./Enums/EError.js";

export const errorHandler = (error, req, res, next) => {
  console.log(error.code);
  switch (error.code) {
    case EError.DATABASE_Error:
      res.json({ status: "error", error: error.cause });
      console.log(error);
      break;
    case EError.AUTH_Error:
      res.json({ status: "error", error: error.cause });
      console.log(error);
      break;
    default:
      res.json({ status: "error", error: "Unhandled Error" });
      break;
  }
  next()
};
