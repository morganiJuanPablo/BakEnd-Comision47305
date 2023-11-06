//
import { Router } from "express";
import passport from "passport";
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
    console.log(error.message);
    res.status(500).json({ message: error.message });
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
    console.log(error.message);
    res.status(500).json({ message: error.message });
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
    console.log(error.message);
    res.status(500).json({ message: error.message });
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
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

///////////////////////////////////////////////////////////////////

//GET
router.get(
  "/profile",
  passport.authenticate("jwtAuth", {
    failureRedirect: "/session_destroyed",
    session: false,
  }),
  async (req, res) => {
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
  }
);

///////////////////////////////////////////////////////////////////

//GET
router.get("/logout", async (req, res) => {
  try {
    res.clearCookie("authLogin");
    res.redirect("/login");
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

///////////////////////////////////////////////////////////////////

//GET
router.get("/session_destroyed", async (req, res) => {
  try {
    res.render("sessionDestroyed", { style: "sessionDestroyed.css" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
    res.redirect("/login");
  }
});

///////////////////////////////////////////////////////////////////

//GET
router.get("/unauthorized", async (req, res) => {
  try {
    res.render("unauthorized", { style: "unauthorized.css" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
    res.redirect("/login");
  }
});

export { router as loginRouter };
