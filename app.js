import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.config.js";
import register from "./src/routes/auth.routes.js";

dotenv.config();
const app = express();
import api from "./src/api.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api", api);

app.get("/", (req, res) => {
  res.send("Hello World");
});

const PORT = parseInt(process.env.PORT) || 4000;

app.use("/api/auth", register);
app.get("/", (req, res) => {
  res.send("Hello World");
  console.log(process.env.JWT_KEY);
});

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found!"));
});

app.use((err, req, res, next) => {
  let { status = 500, message = "Something Went Wrong!" } = err;
  res.status(status).render("error.ejs", { message });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}! 🚀`);
  connectDB();

