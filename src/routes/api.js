import express from "express";
const router = express.Router();

import scoop from "./news.routes.js";
import auth from "./auth.routes.js";

router.use("/auth", auth);
router.use("/scoop", scoop);

export default router;
