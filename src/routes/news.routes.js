import express from "express";
const router = express.Router();
import { topNews } from "../controllers/news.controller.js";

router.get("/top", [], topNews);

export default router;
