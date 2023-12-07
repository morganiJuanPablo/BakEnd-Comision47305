//
import { Router } from "express";
import { ChatsController } from "../controller/chats.controller.js";
import { tokenAuth } from "../middleware/middleware.js";
import { onlyUserAcess } from "../middleware/middleware.js";
const router = Router();

///////////////////////////////////////////////////////////////////

//GET
router.get("/chat", tokenAuth, onlyUserAcess(), ChatsController.getChats);

///////////////////////////////////////////////////////////////////

export { router as chatRouter };
