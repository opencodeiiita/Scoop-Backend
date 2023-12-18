import express from "express";
const router = express.Router();
import { allUsers, deleteUser, findUser, upVote ,registerUser } from "../controllers/user.controllers.js";
import isAdmin from "../middlewares/admin.middleware.js";
import validateToken from "../middlewares/auth.middleware.js";

router.get("/allUsers",validateToken, isAdmin, allUsers);

router.get("/:userId",findUser);

router.post("/:userId/upvote",validateToken, upVote);

router.delete("/delete/:userId",validateToken, isAdmin, deleteUser);

router.post("/registerUser",registerUser);

export default router;
