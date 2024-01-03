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
      res.status(500).json({ message: error.message });
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
      res.status(500).json({ message: error.message });
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
      res.status(500).json({ message: error.message });
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
      res.status(500).json({ message: error.message });
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
            email: user.email,
            role: user.role,
            status: "success",
          };
          return res.json(data);
        }
      } else {
        const data = {
          message: "No se ha ingresado ningún valor",
          status: "error",
        };
        return res.json(data);
      }
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ message: error.message });
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
      res.status(500).json({ message: error.message });
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
      res.status(500).json({ message: error.message });
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
      res.status(500).json({ message: error.message });
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
      res.status(500).json({ message: error.message });
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
      }
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ message: error.message });
    }
  };

  /////////////////////////////////////////////////////
  static sessionDestroyedView = async (req, res) => {
    try {
      res.render("sessionDestroyed", { style: "sessionDestroyed.css" });
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ message: error.message });
      res.redirect("/api/session/login");
    }
  };

  /////////////////////////////////////////////////////
  static unauthorizedView = async (req, res) => {
    try {
      res.render("unauthorized", { style: "unauthorized.css" });
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ message: error.message });
    }
  };

  /////////////////////////////////////////////////////
  static generateNewUser = async (req, res) => {
    try {
      const data = {
        style: "login.css",
        message: `🤟Felicidades ${req.user.first_name}, estás dentro🤟`,
      };
      res.render("login", data);
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ message: error.message });
    }
  };

  /////////////////////////////////////////////////////
  static loginUser = async (req, res) => {
    try {
      const user = req.user;
      const token = generateToken(user);
      res.cookie("authLoginFoo", token, { maxAge: 3600000, httpOnly: true });
      /* res.json({ status: "success", message: "Usuario logueado" }); */
      res.redirect("/products/inicio");
    } catch (error) {
      const data = {
        style: "login.css",
        error: "No se pudo iniciar la sesión",
      };
      res.render("login", data);
      logger.error(error.message);
      /*       
    res.status(500).json({ message: error.message }); */
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
      res.render("login", data);
      logger.error(error.message);
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
      res.render("login", data);
      logger.error(error.message);
    }
  };

  /////////////////////////////////////////////////////
  static logout = (req, res) => {
    try {
      res.clearCookie("authLoginFoo");
      res.redirect("/api/session/login");
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ message: error.message });
    }
  };

  /////////////////////////////////////////////////////
  static modifyRoleUser = async (req, res) => {
    try {
      const { userId } = req.body;
      
      const user = await sessionsService.getUserById(userId);
      if (user) {
        if (user.role === "Usuario") {
          user.role = "Premium";
        } else if (user.role === "Premium") {
          user.role = "Usuario";
        }
      }
      const userNewRole = await sessionsService.updateUser(userId, user);
      res.json({
        status: "success",
        data: userNewRole.role,
      });
      /* res.json({ status: "error", message: "El usuario ingresado no existe" }); */
    } catch (error) {
      logger.error(error.message);
      res.json({ status: "error", message: error.message });
    }
  };
}
