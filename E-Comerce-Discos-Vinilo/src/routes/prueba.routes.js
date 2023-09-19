import { Router } from "express";

const router = Router();

router.get("/prueba", (req, res)=>{
    res.render("prueba")
})

export {router as prueba}