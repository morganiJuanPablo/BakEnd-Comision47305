import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generalConfig } from "./config/generalConfig.js";
import multer from "multer";

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
      id: user.id.toString(),
      name: user.full_name,
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
  userName.includes(generalConfig.managers.domainManagers)
    ? (role = "Administrador")
    : (role = "Usuario");
  return role;
};

//Multer
//
//Definimos funciones que nos van a servir de filtros para que multer suba o no la imagen dependiendo si el usuario coloca toda la inforanción requerida. Luego en las propiedades de multer, colocamos la de fileFilter que va a recibir el callback con el valor true si el usuario cargó bien los datos o false si no lo hizo de manera correcta. Entonces asi cuando el usuario no se registra porque no cargó bien la info, tampoco se va cargar la imagen.

const checkValidFields = (user) => {
  const { first_name, email, password } = user;
  if (!first_name || !email || !password) {
    return false;
  } else {
    return true;
  }
};
//filtro para subir imagenes de usuarios
const profileMulterFilter = (req, file, callback) => {
  if (!checkValidFields(req.body)) {
    callback(null, false);
  } else {
    callback(null, true);
  }
};
//
//USUARIOS
//Imágenes usuarios. Usamos diskStorage de multer ya que lo vamos a guardar en la memoria del servidor. En archivo.

const profileUsersStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.join(__dirname, "/multer/users/img"));
  },
  //Nombre de la imagen
  filename: function (req, file, callback) {
    callback(null, `${req.body.email}-profile-${file.originalname}`);
  },
});

//uploader de las imágenes de perfil de los usarios.
const uploadImgProfileUsers = multer({
  storage: profileUsersStorage,
  fileFilter: profileMulterFilter,
});

//Documentos usuarios. Usamos diskStorage de multer ya que lo vamos a guardar en la memoria del servidor. En archivo.

const documentsStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.join(__dirname, "/multer/users/documents"));
  },
  //Nombre de la imagen
  filename: function (req, file, callback) {
    callback(null, `${req.body.email}-document-${file.originalname}`);
  },
});

//uploader de los documentos de los usarios.
const uploadDocumentUsers = multer({
  storage: documentsStorage,
  fileFilter: profileMulterFilter,
});

//
//PRODUCTOS
//Imágenes productoa.

const productsImgStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.join(__dirname, "/multer/products/img"));
  },
  //Nombre de la imagen. Usamos la propiedad 'code', que es un dato único de cada producto.
  filename: function (req, file, callback) {
    callback(null, `${req.body.code}-profile-image-${file.originalname}`);
  },
});

//uploader de las imágenes de perfil de los usarios.
const uploadImgProducts = multer({
  storage: productsImgStorage,
  fileFilter: profileMulterFilter,
});

export { uploadImgProfileUsers, uploadDocumentUsers, uploadImgProducts };
