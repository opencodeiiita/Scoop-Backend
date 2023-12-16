import express from "express";
import { topNews, credibleNews } from "../controllers/news.controller.js";
import { latestnews } from "../controllers/news.controllers.js"
const router = express.Router();

router.get("/top", [], topNews);
router.get("/credible", [], credibleNews);
router.get("/latest", latestnews);

export default router;






