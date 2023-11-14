//
import { generateToken } from "../utils.js";

export class SessionsController {
  /////////////////////////////////////////////////////
  static renderLoginView = async (req, res) => {
    try {
      const data = {
        style: "login.css",
      };
      res.render("login", data);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  };

  /////////////////////////////////////////////////////
  static renderLoginfailView = async (req, res) => {
    try {
      const data = {
        style: "login.css",
        error: "Credenciales no válidas",
      };
      res.render("login", data);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  };

  /////////////////////////////////////////////////////
  static renderNewUserView = async (req, res) => {
    try {
      const data = {
        style: "login_newUser.css",
      };
      res.render("loginNewUser", data);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  };

  /////////////////////////////////////////////////////
  static renderNewUserFailView = async (req, res) => {
    try {
      const data = {
        style: "login_newUser.css",
        error: "Error al registrar el usuario",
      };
      res.render("loginNewUser", data);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  };

  /////////////////////////////////////////////////////
  static renderProfileView = async (req, res) => {
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
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  };

  /////////////////////////////////////////////////////
  static renderSessionDestroyedView = async (req, res) => {
    try {
      res.render("sessionDestroyed", { style: "sessionDestroyed.css" });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
      res.redirect("/api/session/login");
    }
  };

  /////////////////////////////////////////////////////
  static renderUnauthorizedView = async (req, res) => {
    try {
      res.render("unauthorized", { style: "unauthorized.css" });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  };

  /////////////////////////////////////////////////////
  static redirectLoginNewUser = async (req, res) => {
    try {
      const data = {
        style: "login.css",
        message: `🤟Felicidades ${req.user.first_name}, estás dentro🤟`,
      };
      res.render("login", data);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  };

  /////////////////////////////////////////////////////
  static newSessionUser = async (req, res) => {
    try {
      const user = req.user;
      const token = generateToken(user);
      res.cookie("authLoginFoo", token, { maxAge: 3600000, httpOnly: true });
      res.redirect("/products/inicio");
    } catch (error) {
      const data = {
        style: "login.css",
        error: "No se pudo iniciar la sesión",
      };
      res.render("login", data);
      /*       console.log(error.message);
    res.status(500).json({ message: error.message }); */
    }
  };

  /////////////////////////////////////////////////////
  static newSessionGitHub = async (req, res) => {
    const user = req.user;
    const token = generateToken(user);
    res.cookie("authLoginFoo", token, { maxAge: 3600000, httpOnly: true });
    res.redirect("/products/inicio");
  };

  /////////////////////////////////////////////////////
  static newSessionGoogle = (req, res) => {
    const user = req.user;
    const token = generateToken(user);
    res.cookie("authLoginFoo", token, { maxAge: 3600000, httpOnly: true });
    res.redirect("/products/inicio");
  };

  /////////////////////////////////////////////////////
  static logout = (req, res) => {
    try {
      res.clearCookie("authLoginFoo");
      res.redirect("/api/session/login");
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  };
}
