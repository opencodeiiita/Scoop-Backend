import express from "express";
const router = express.Router();
import { topNews, credibleNews } from "../controllers/news.controller.js";

router.get("/top", [], topNews);
router.get("/credible", [], credibleNews);

export default router;
