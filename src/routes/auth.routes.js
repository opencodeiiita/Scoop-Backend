import express from "express";
const router = express.Router();
import { register, login } from "../controllers/user.controllers.js";

router.get("/register", (req, res) => {
  res.send("Hii");
});

router.post("/register", register);

router.get("/login", (req, res) => {
  res.send("LOgin");
});

router.post("/login", login);

export default router;
