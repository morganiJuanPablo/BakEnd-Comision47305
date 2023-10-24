//
import { Router } from "express";
import { roleClient } from "../utils.js";
const router = Router();

///////////////////////////////////////////////////////////////////

//GET
router.get("/login", async (req, res) => {
  try {
    const data = {
      style: "login.css",
    };
    res.render("login", data);
  } catch (error) {
    res.json({ status: "Error", message: error.message });
  }
});

///////////////////////////////////////////////////////////////////

//GET
router.get("/login_fail", async (req, res) => {
  try {
    const data = {
      style: "login.css",
      error: "Credenciales no válidas",
    };
    res.render("login", data);
  } catch (error) {
    res.json({ status: "Error", message: error.message });
  }
});

///////////////////////////////////////////////////////////////////

//GET
router.get("/new_user", async (req, res) => {
  try {
    const data = {
      style: "login_newUser.css",
    };
    res.render("loginNewUser", data);
  } catch (error) {
    res.json({ status: "Error", message: error.message });
  }
});

///////////////////////////////////////////////////////////////////

//GET
router.get("/new_user_fail", async (req, res) => {
  try {
    console.log(req.body);
    const data = {
      style: "login_newUser.css",
      error: "Error al registrar el usuario",
    };
    res.render("loginNewUser", data);
  } catch (error) {
    res.json({ status: "Error", message: error.message });
  }
});

///////////////////////////////////////////////////////////////////

//GET
router.get("/profile", async (req, res) => {
  try {
    if (req.user?.email) {
      const role = roleClient(req);
      const ageExist = req.user.age && true;
      const data = {
        style: "profile.css",
        userFirstName: req.user.first_name,
        age: req.user.age,
        email: req.user.email,
        role,
        ageExist,
      };
      res.render("profile", data);
    } else {
      res.redirect("/session_destroyed");
    }
  } catch (error) {
    res.json({ status: "Error", message: error.message });
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

///////////////////////////////////////////////////////////////////

//GET
router.get("/session_destroyed", async (req, res) => {
  try {
    res.render("sessionDestroyed", { style: "sessionDestroyed.css" });
  } catch (error) {
    console.log(error.message);
    res.redirect("/login");
  }
});

export { router as loginRouter };
