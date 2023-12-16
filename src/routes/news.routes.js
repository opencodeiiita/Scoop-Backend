import express from "express";
import { deleteNews, getNews, latestnews, postNews, upvoteNews } from "../controllers/news.controllers.js"
import validateToken from "../middlewares/auth.middleware.js";
import isAdmin from "../middlewares/admin.middleware.js";

const router = express.Router();

router.get("/latest", latestnews);
router.post("/post",validateToken, postNews );
router.post("/:scoopId/upvote",validateToken, upvoteNews);
router.get("/:scoopId", getNews);
router.delete("/delete/:scoopId", validateToken, isAdmin, deleteNews);

// router.post("/post", )
export default router;