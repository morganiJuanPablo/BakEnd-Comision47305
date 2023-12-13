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

let role;
export const roleClient = (userName) => {
  userName === "adminCoder@coder.com"
    ? (role = "Administrador")
    : (role = "Usuario");
  return role;
};



