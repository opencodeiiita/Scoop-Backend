import express from "express";
import { latestnews } from "../controllers/news.controllers.js"

const router = express.Router();

router.get("/latest", latestnews);

export default router;