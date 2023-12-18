import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.config.js";
const express = require('express');
const userController = require('./user.controllers');
const app = express();

dotenv.config();
const app = express();
import api from "./src/routes/api.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", api);

const PORT = parseInt(process.env.PORT) || 4000;

app.get("/", (req, res) => {
  res.send("Hello World");
  console.log(process.env.JWT_KEY);
});

// app.all("*", (req, res, next) => {
//   next(new ExpressError(404, "Page not found!"));
// });

app.use((err, req, res, next) => {
  let { status = 500, message = "Something Went Wrong!" } = err;
  res.status(status).render("error.ejs", { message });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}! 🚀`);
  connectDB();
});

app.post('/register', userController.registerUser);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
