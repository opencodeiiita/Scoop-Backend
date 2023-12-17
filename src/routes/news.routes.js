import express from "express";
import { deleteNews, getNews, postNews, upvoteNews } from "../controllers/news.controllers.js"
import validateToken from "../middlewares/auth.middleware.js";
import isAdmin from "../middlewares/admin.middleware.js";
const router = express.Router();
import homeRouter from "./home.routes.js";
import { getComments, postComment, editComment } from "../controllers/comments.controllers.js";

// home route
router.use("/home", homeRouter);

// news routes
router.post("/post",validateToken, postNews );
router.post("/:scoopId/upvote",validateToken, upvoteNews);
router.get("/:scoopId", getNews);
router.delete("/delete/:scoopId", validateToken, isAdmin, deleteNews);

// comments routes
router.get("/:scoopId/comments", getComments);
router.post("/:scoopId/comments", validateToken, postComment);
router.patch("/:scoopId/comments/:commentId", validateToken, editComment);
export default router;
