//
import { Router } from "express";
const router = Router();

///////////////////////////////////////////////////////////////////

//GET

router.get("/chat", async (req, res) => {
  try {
    res.render("chat", { style: "chat.css" });
  } catch (error) {
    res.json({ Error: error.message });
  }
});

export { router as chatRouter };
