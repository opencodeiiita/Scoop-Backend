import express from "express";
const router = express.Router();
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
const { jwt } = "jsonwebtoken";
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
