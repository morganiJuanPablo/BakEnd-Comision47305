//

import passport from "passport";
import compression from "express-compression";
import { EError } from "../Enums/EError.js";

export const errorHandler = (error, req,res,next)=>{
    console.log(error.code);
    switch (error.code) {
        case EError.DATABASE_Error:
            res.json({status:"error", error:error.cause});
            break;

        case EError.INVALID_INFO_BODY:
            res.json({status:"error", error:error.message});
            break;

        case EError.INVALID_PARAM:
            res.json({status:"error", error:error.cause, message:error.message});
            break;

        default:
            break;
    }
};

//funciones para manejar la autorización según el rol del cliente en el RealTimeProducts, chat y carritos

export const onlyAdminAcess = () => {
  return (req, res, next) => {
    if (req.user.role !== "Administrador") {
      return res.redirect("/api/session/unauthorized");
      /* .status(403)
          .json({ error: "No tienes los permisos para acceder." }); */
    }
    next();
  };
};
export const onlyUserAcess = () => {
  return (req, res, next) => {
    if (req.user.role !== "Usuario") {
      return res.redirect("/api/session/unauthorized");
      /* .status(403)
          .json({ error: "No tienes los permisos para acceder." }); */
    }
    next();
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
    failureRedirect: "/api/session/new_user_fail",
    session: false,
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
