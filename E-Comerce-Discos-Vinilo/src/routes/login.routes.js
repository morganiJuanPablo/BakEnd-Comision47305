//
import { Router } from "express";
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
router.get("/new_user", async (req, res) => {
  try {
    const data = {
      style: "login.css",
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
    const ageExist = req.session.age && true;
    const data = {
      style: "profile.css",
      userFirstName: req.session.first_name,
      age: req.session.age,
      email: req.session.email,
      role: req.session.role,
      ageExist,
    };
    res.render("profile", data);
  } catch (error) {
    res.json({ status: "Error", message: error.message });
  }
});

export { router as loginRouter };
