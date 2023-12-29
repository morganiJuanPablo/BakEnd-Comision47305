//

import passport from "passport";
import compression from "express-compression";
import { EError } from "../errors/Enums/EError.js";

export const errorHandler = (error, req, res, next) => {
  switch (error.code) {
    case EError.DATABASE_Error:
      res.json({ status: "error", error: error.cause });
      break;

    case EError.INVALID_INFO_BODY:
      res.json({ status: "error", error: error.message });
      break;

    case EError.INVALID_PARAM:
      res.json({ status: "error", error: error.cause, message: error.message });
      break;

    default:
      break;
  }
};

//funciones para manejar la autorización según el rol del cliente en el RealTimeProducts, chat y carritos
export const checkRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .redirect("/api/session/unauthorized")
        .status(401)
        .json({ message: "No tienes accesso" });
    } else {
      next();
    }
  };
};

//Función para obtener el id del usuario conectado y aplicarlo a la propiedad owner de los productos cuando se crea con el protocolo websocket
export const getUserIdOwner = () => {
  return (req, res, next) => {
    if (req.user) {
      return res
        .redirect("/api/session/unauthorized")
        .status(401)
        .json({ message: "No tienes accesso" });
    } else {
      next();
    }
  };
};

///////////////////////////////////////////////////////////////////////
//Middleware de passport y token
export const tokenAuth = passport.authenticate("jwtAuth", {
  failureRedirect: "/api/session/session_destroyed",
  session: false,
});

///////////////////////////////////////////////////////////////////////
//Middleware de autenticacion registro con passport
export const authRegisterPassport = passport.authenticate(
  "localRegisterStrategy",
  {
    failureRedirect: "/api/session/new_user",
    session: false,
    failureFlash: true,
  }
);

///////////////////////////////////////////////////////////////////////
//Middleware de autenticacion login con passport
export const authLoginPassport = passport.authenticate("localLoginStrategy", {
  failureRedirect: "/api/session/login_fail",
  session: false,
});

//////////////////////////////////////////////////////////////////////
//Configuración para el compresor Brotli
export const brotliConfig = compression({ enabled: true, zlib: {} });
