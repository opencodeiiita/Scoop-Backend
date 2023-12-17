import express from "express";
const router = express.Router();

import scoop from "./news.routes.js";
import auth from "./auth.routes.js";
import user from "./user.routes.js";
import homeRouter from "./home.routes.js";


router.use("/auth", auth);
router.use("/scoop", scoop);
router.use("/user", user);
export default router;
