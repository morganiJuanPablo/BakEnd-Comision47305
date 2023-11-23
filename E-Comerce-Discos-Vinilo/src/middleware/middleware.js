//

import passport from "passport";

//funciones para manejar la autorización según el rol del cliente en el RealTimeProducts, chat y carritos

export const onlyAdminAcess = () => {
  return (req, res, next) => {
    if (req.user.role !== "administrador") {
      return res.redirect("/api/session/unauthorized");
      /* .status(403)
          .json({ error: "No tienes los permisos para acceder." }); */
    }
    next();
  };
};
export const onlyUserAcess = () => {
  return (req, res, next) => {
    if (req.user.role !== "usuario") {
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
