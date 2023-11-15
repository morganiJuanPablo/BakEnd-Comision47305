//
import { Router } from "express";
import passport from "passport";
import { ChatsController } from "../controller/chats.controller.js";
const router = Router();

///////////////////////////////////////////////////////////////////

//GET
router.get(
  "/chat",
  passport.authenticate("jwtAuth", { session: false }),
  ChatsController.getChats
);

///////////////////////////////////////////////////////////////////

export { router as chatRouter };
