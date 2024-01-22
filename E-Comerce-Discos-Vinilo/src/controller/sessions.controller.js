//
import { generateToken, isValidated, createHashPass } from "../utils.js";
import { logger } from "../helpers/logger.js";
import { sessionsService } from "../repository/index.js";
import {
  createEmailToken,
  emailToSendNewPass,
  emailTokenValidation,
} from "../helpers/gmail.js";

export class SessionsController {
  /////////////////////////////////////////////////////
  static loginView = async (req, res) => {
    try {
      const data = {
        style: "login.css",
      };
      res.render("login", data);
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ message: error.message });
    }
  };

  /////////////////////////////////////////////////////
  static loginFailView = async (req, res) => {
    try {
      const data = {
        style: "login.css",
        error: "Credenciales no válidas",
      };
      res.render("login", data);
    } catch (error) {
      logger.error(error.message);
      res.send({ status: "error", message: error.message });
    }
  };

  /////////////////////////////////////////////////////
  static newUserView = async (req, res) => {
    try {
      const data = {
        style: "login_newUser.css",
      };
      res.render("loginNewUser", data);
    } catch (error) {
      logger.error(error.message);
      res.send({ status: "error", message: error.message });
    }
  };

  /////////////////////////////////////////////////////
  static linkNewPasswordView = async (req, res) => {
    try {
      const data = {
        style: "linkNewPassword.css",
      };
      res.render("linkNewPassword", data);
    } catch (error) {
      logger.error(error.message);
      res.send({ status: "error", message: error.message });
    }
  };

  /////////////////////////////////////////////////////
  static modifyRoleUserView = async (req, res) => {
    try {
      const data = {
        style: "modifyRoleUser.css",
      };
      res.render("modifyRoleUser", data);
    } catch (error) {
      logger.error(error.message);
      res.send({ status: "error", message: error.message });
    }
  };

  /////////////////////////////////////////////////////
  static getUserById = async (req, res) => {
    try {
      const { userId } = req.body;
      if (userId) {
        const user = await sessionsService.getUserById(userId);
        if (user) {
          const data = {
            status: "success",
            email: user.email,
            role: user.role,
            statusDocs: user.status,
          };
          res.send(data);
        } else {
          res.send({
            status: "error",
            message: "El usuario no existe en nuestros registros.",
          });
        }
      } else {
        res.send({
          status: "error",
          message: "No se ha ingresado ningún valor",
        });
      }
    } catch (error) {
      logger.error(error.message);
      res.send({ status: "error", message: error.message });
    }
  };

  /////////////////////////////////////////////////////
  static linkNewPassword = async (req, res) => {
    try {
      const { email } = req.body;
      const user = await sessionsService.getUser(email);
      if (user) {
        const emailToken = createEmailToken(email, 300);
        await emailToSendNewPass(req, email, emailToken);
        const successMessage = user && true;
        const data = {
          style: "linkNewPassword.css",
          successMessage,
        };
        res.render("linkNewPassword", data);
      } else {
        const errorMessage = !user && true;
        const data = {
          style: "linkNewPassword.css",
          errorMessage,
        };
        res.render("linkNewPassword", data);
        /* res.json({status:"error", message: `El usuario ${email} no existe en nuestros registros`}) */
      }
    } catch (error) {
      logger.error(error.message);
      res.send({ status: "error", message: error.message });
    }
  };

  /////////////////////////////////////////////////////
  static generateNewPasswordView = async (req, res) => {
    try {
      const token = req.query.token;
      const data = {
        style: "newUserPass.css",
        token,
      };
      return res.render("newUserPass", data);
    } catch (error) {
      logger.error(error.message);
      res.send({ status: "error", message: error.message });
    }
  };

  /////////////////////////////////////////////////////
  static generateNewPassword = async (req, res) => {
    try {
      let passwordWrong;
      let tokenLost;
      let invalidPassword;
      const token = req.query.token;
      const { newPassword, newPasswordRepeat } = req.body;

      if (newPassword !== newPasswordRepeat) {
        passwordWrong = true;
        const data = {
          style: "newUserPass.css",
          passwordWrong,
        };
        return res.render("newUserPass", { ...data, token });
      }
      const tokenOk = await emailTokenValidation(token);
      if (!tokenOk) {
        tokenLost = true;
        const data = {
          style: "newUserPass.css",
          tokenLost,
        };
        return res.render("newUserPass", { ...data, token });
      }
      const user = await sessionsService.getUser(tokenOk.email);
      if (isValidated(newPassword, user)) {
        invalidPassword = true;
        const data = {
          style: "newUserPass.css",
          invalidPassword,
        };
        return res.render("newUserPass", { ...data, token });
      }
      let passwordReseted = true;
      const newInfoUser = {
        ...user,
        password: createHashPass(newPassword),
      };
      await sessionsService.updateUser(user._id, newInfoUser);
      const data = {
        style: "login.css",
        passwordReseted,
      };
      return res.render("login", data);
    } catch (error) {
      logger.error(error.message);
      res.send({ status: "error", message: error.message });
    }
  };

  /////////////////////////////////////////////////////
  static newUserFailView = async (req, res) => {
    try {
      const data = {
        style: "login_newUser.css",
        error: "Error al registrar el usuario",
      };
      res.render("loginNewUser", data);
    } catch (error) {
      logger.error(error.message);
      res.send({ status: "error", message: error.message });
    }
  };

  /////////////////////////////////////////////////////
  static profileView = async (req, res) => {
    try {
      if (req.user?.email) {
        const ageExist = req.user.age && true;
        const sessionExist = req.user.email && true;
        const data = {
          style: "profile.css",
          userFirstName: req.user.name,
          age: req.user.age,
          email: req.user.email,
          role: req.user.role,
          ageExist,
          sessionExist,
        };
        res.render("profile", data);
      } else {
        res.redirect("/api/session/session_destroyed");
      }
    } catch (error) {
      logger.error(error.message);
      res.send({ status: "error", message: error.message });
    }
  };

  /////////////////////////////////////////////////////
  static sessionDestroyedView = async (req, res) => {
    try {
      res.render("sessionDestroyed", { style: "sessionDestroyed.css" });
    } catch (error) {
      logger.error(error.message);
      res.redirect("/api/session/login");
    }
  };

  /////////////////////////////////////////////////////
  static unauthorizedView = async (req, res) => {
    try {
      res.render("unauthorized", { style: "unauthorized.css" });
    } catch (error) {
      logger.error(error.message);
      res.send({ status: "error", message: error.message });
    }
  };

  /////////////////////////////////////////////////////
  static generateNewUser = async (req, res) => {
    try {
      const user = req.user;
      const data = {
        style: "login.css",
        message: `🤟Felicidades ${user.first_name}, estás dentro🤟`,
        payload: user,
      };
      res.render("login", data);
    } catch (error) {
      logger.error(error.message);
      res.send({ status: "error", message: error.message });
    }
  };

  /////////////////////////////////////////////////////
  static loginUser = async (req, res) => {
    try {
      const user = req.user;
      /* console.log("user desde el controlador", req.user); */
      const token = generateToken(user);
      res.cookie("authLoginFoo", token, { maxAge: 3600000, httpOnly: true });
      /* res.json({ status: "success", message: "Usuario logueado" }); */
      res.redirect("/products/inicio");
    } catch (error) {
      const data = {
        style: "login.css",
        error: "No se pudo iniciar la sesión",
      };
      logger.error(error.message);
      res.render("login", data);
    }
  };

  /////////////////////////////////////////////////////
  static newSessionGitHub = async (req, res) => {
    try {
      const user = req.user;
      const token = await generateToken(user);
      res.cookie("authLoginFoo", token, { maxAge: 3600000, httpOnly: true });
      res.redirect("/products/inicio");
    } catch (error) {
      const data = {
        style: "login.css",
        error: "No se pudo iniciar la sesión",
      };
      logger.error(error.message);
      res.render("login", data);
    }
  };

  /////////////////////////////////////////////////////
  static newSessionGoogle = async (req, res) => {
    try {
      const user = req.user;
      const token = await generateToken(user);
      res.cookie("authLoginFoo", token, { maxAge: 3600000, httpOnly: true });
      res.redirect("/products/inicio");
    } catch (error) {
      const data = {
        style: "login.css",
        error: "No se pudo iniciar la sesión",
      };
      logger.error(error.message);
      res.render("login", data);
    }
  };

  /////////////////////////////////////////////////////
  static logout = async (req, res) => {
    try {
      const user = { ...req.user };
      user.last_connection = new Date();
      await sessionsService.updateUser(user.id, user);
      res.clearCookie("authLoginFoo");
      res.redirect("/api/session/login");
    } catch (error) {
      logger.error(error.message);
      res.send({ status: "error", message: error.message });
    }
  };

  /////////////////////////////////////////////////////
  static modifyRoleUser = async (req, res) => {
    try {
      const { userId } = req.body;
      const user = await sessionsService.getUserById(userId);
      if (user.status === "Completo") {
        if (user.role === "Usuario") {
          user.role = "Premium";
        } else {
          user.role = "Usuario";
        }
        const userNewRole = await sessionsService.updateUser(userId, user);
        res.send({
          status: "success",
          message: `Usuario actualizado con éxito.\nNuevo rol: ${userNewRole.role}.`,
        });
      } else {
        res.send({
          status: "error",
          message: "El usuario no ha completado la documentación necesaria.",
        });
      }
    } catch (error) {
      logger.error(error.message);
      res.send({ status: "error", message: error.message });
    }
  };

  /////////////////////////////////////////////////////
  static uploadDocuments = async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await sessionsService.getUserById(userId);
      //Ahora multer al pasar por el middleware crea una propiedad llamada req.files y a partir de la misma vamos a obtener la info de cada documento por separado. Ya que recibimos un arreglo por cada documento. Luego pusheamos en un solo arreglo todos los documentos validando que el usuario nos lo haya enviado.
      const UserIdentification = req.files["identification"]?.[0] || null;
      const UserResidence = req.files["residence"]?.[0] || null;
      const UserBankStatement = req.files["bankStatement"]?.[0] || null;
      const docs = [];
      if (UserIdentification) {
        docs.push({
          name: "UserIdentification",
          reference: UserIdentification.filename,
        });
      }
      if (UserResidence) {
        docs.push({
          name: "UserResidence",
          reference: UserResidence.filename,
        });
      }
      if (UserBankStatement) {
        docs.push({
          name: "UserBankStatement",
          reference: UserBankStatement.filename,
        });
      }
      user.documents = docs;
      if (docs.length < 3) {
        user.status = "Incompleto";
      } else {
        user.status = "Completo";
      }
      await sessionsService.updateUser(user._id, user);
      res.send({ status: "success", message: "Se cargaron los documentos." });
    } catch (error) {
      logger.error(error.message);
      res.send({ status: "error", message: error.message });
    }
  };
}
