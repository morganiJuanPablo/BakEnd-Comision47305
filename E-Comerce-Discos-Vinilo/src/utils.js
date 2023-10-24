import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";

export const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const createHashPass = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync());
};

export const isValidated = (password, userInfo) => {
  return bcrypt.compareSync(password, userInfo.password);
};

//función para saber conocer el rol del cliente y poder acceder o no al administrador de productos

export const roleClient = (req) => {
  req.user?.email === "adminCoder@coder.com"
    ? (req.user.role = "Administrador")
    : (req.user.role = "Usuario");
  const role = req.user?.role;
  return role;
};
