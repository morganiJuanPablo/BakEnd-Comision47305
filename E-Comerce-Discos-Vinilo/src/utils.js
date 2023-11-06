import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generalConfig } from "./config/generalConfig.js";

export const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const createHashPass = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync());
};

export const isValidated = (password, userInfo) => {
  return bcrypt.compareSync(password, userInfo.password);
};

export const generateToken = (user) => {
  const token = jwt.sign(
    {
      name: user.first_name,
      email: user.email,
      role: user.role,
      age: user.age,
      cartId: user.cart,
    },
    generalConfig.tokenJWT.tokenJWTkey,
    { expiresIn: "1h" }
  );
  return token;
};

//funciones para manejar la autorización según el rol del cliente

export const roleClient = () => {
  return async (req) => {
    const role = req.user.role;
    return role;
  };
};

export const authorize = () => {
  return async (req, res, next) => {
    if (req.user.role !== "administrador") {
      return res.redirect("/unauthorized");
      /* .status(403)
        .json({ error: "No tienes los permisos para acceder." }); */
    }
    next();
  };
};
