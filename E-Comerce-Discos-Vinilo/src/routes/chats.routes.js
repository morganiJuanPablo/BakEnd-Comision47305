//
import { Router } from "express";
import { ChatsController } from "../controller/chats.controller.js";
import { tokenAuth, checkRole } from "../middleware/middleware.js";
const router = Router();

///////////////////////////////////////////////////////////////////

//GET
router.get("/chat", tokenAuth, checkRole(["Usuario", "Premium"]), ChatsController.getChats);

///////////////////////////////////////////////////////////////////

export { router as chatRouter };
