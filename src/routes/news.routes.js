import express from "express";
import { getnews } from "../controllers/news.controllers.js"

const router = express.Router();

router.get("/getnews", getnews);

export default router;