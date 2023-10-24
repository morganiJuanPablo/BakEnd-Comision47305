//
import { Router } from "express";
import { roleClient } from "../utils.js";
const router = Router();

///////////////////////////////////////////////////////////////////

//GET
router.get("/chat", async (req, res) => {
  try {
    if (req.user?.email) {
      const role = roleClient(req);
      const isAdmin = req.user.role === "Administrador" && true;
      const data = {
        isAdmin,
        role,
        userFirstName: req.user.first_name,
        style: "chat.css",
      };
      res.render("chat", data);
    } else {
      res.redirect("/session_destroyed");
    }
  } catch (error) {
    res.json({ Error: error.message });
  }
});

export { router as chatRouter };
