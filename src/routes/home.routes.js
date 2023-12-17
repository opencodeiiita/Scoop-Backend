import express from "express";
import { latestnews, topNews, credibleNews, getNewsCategories } from "../controllers/home.controllers.js"
const router = express.Router();

router.get("/top",  topNews);
router.get("/credible", credibleNews);
router.get("/latest", latestnews);
router.get("/categories", getNewsCategories);


export default router;