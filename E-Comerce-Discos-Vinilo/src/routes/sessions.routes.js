//
import { Router } from "express";
import { mongoUserItem } from "../dao/index.js";
const router = Router();

///////////////////////////////////////////////////////////////////

//POST
router.post("/new_user", async (req, res) => {
  try {
    const newUserInfo = req.body;
    const newUser = await mongoUserItem.createUser(newUserInfo);
    const data = {
      style: "login.css",
      message: `🤟Felicidades ${newUser.first_name}, estás dentro🤟`,
    };
    res.render("login", data);
  } catch (error) {
    res.render("login", { Error: error.message });
  }
});

///////////////////////////////////////////////////////////////////

//POST
router.post("/login", async (req, res) => {
  try {
    const loginUser = req.body;
    if (
      loginUser.password === "adminCod3r123" &&
      loginUser.email === "adminCoder@coder.com"
    ) {
      req.session.first_name = "Administrador";
      req.session.email = loginUser.email;
      req.session.role = "Admin";
    } else {
      const user = await mongoUserItem.getUser(loginUser.email);
      if (!user) {
        const data = {
          style: "login.css",
          error: "El usuario ingresado no existe en nuestros registros",
        };
        return res.render("login", data);
      }
      if (user.password !== loginUser.password) {
        const data = {
          style: "login.css",
          error: "Credenciales inválidas",
        };
        return res.render("login", data);
      }
      req.session.role = "Usuario";
      req.session.first_name = user.first_name;
      req.session.last_name = user.last_name;
      req.session.age = user.age;
      req.session.email = user.email;
    }
    //////
    res.redirect("/products/inicio");
    //////
  } catch (error) {
    const data = {
      style: "login.css",
      error: "No se pudo iniciar la sesión",
    };
    console.log(error.message);
    res.render("login", data);
  }
});

///////////////////////////////////////////////////////////////////

//GET
router.get("/logout", async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        const data = {
          style: "home.css",
          error: "No se pudo cerrar sesión",
        };
        return res.render("home", data);
      } else {
        res.redirect("/login");
      }
    });
  } catch (error) {
    console.log(error.message);
  }
});

export { router as sessionsRouter };
