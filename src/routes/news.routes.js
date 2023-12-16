import express from "express";
import { deleteNews, getNews, latestnews, postNews, upvoteNews } from "../controllers/news.controllers.js"
import validateToken from "../middlewares/auth.middleware.js";
import isAdmin from "../middlewares/admin.middleware.js";

import { topNews, credibleNews } from "../controllers/news.controllers.js";
import { latestnews } from "../controllers/news.controllers.js";
const router = express.Router();

router.get("/top", [], topNews);
router.get("/credible", [], credibleNews);
router.get("/latest", latestnews);
router.post("/post",validateToken, postNews );
router.post("/:scoopId/upvote",validateToken, upvoteNews);
router.get("/:scoopId", getNews);
router.delete("/delete/:scoopId", validateToken, isAdmin, deleteNews);

export default router;
