//
import { Router } from "express";
const router = Router();

///////////////////////////////////////////////////////////////////

//GET
router.get("/realtimeproducts", async (req, res) => {
  try {
    const isAdmin = req.session.role === "Admin" && true;
    const data = {
      isAdmin,
      role: req.session.role,
      userFirstName: req.session.first_name,
      style: "realTimeProducts.css",
    };
    res.render("realTimeProducts", data);
  } catch (error) {
    res.json({ Error: error.message });
  }
});

export { router as realTimeProducts };
