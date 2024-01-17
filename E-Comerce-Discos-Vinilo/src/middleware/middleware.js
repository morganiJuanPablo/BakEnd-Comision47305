//

import passport from "passport";
import compression from "express-compression";

//funciones para manejar la autorización según el rol del cliente en el RealTimeProducts, chat y carritos
export const checkRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.redirect("/api/session/unauthorized");
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
