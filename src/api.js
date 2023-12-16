import express from "express";
const router = express.Router();

import scoop from "./routes/news.routes.js";

router.use("/scoop", scoop);

export default router;
