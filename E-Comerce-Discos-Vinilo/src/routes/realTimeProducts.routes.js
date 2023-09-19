//
import { Router } from "express";
const router = Router();

//GET
router.get("/realtimeproducts", async (req, res) => {
  try {
    res.render("realTimeProducts", { style: "realTimeProducts.css" });
  } catch (error) {
    res.json({ Error: error.message });
  }
});

export { router as realTimeProducts };
