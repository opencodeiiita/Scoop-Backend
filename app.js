import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.config.js";
import register from "./src/routes/auth.routes.js";
import newsRoute from "./src/routes/news.routes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/auth", register);
app.use("/api/news", newsRoute);

const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send("Hello World");
  console.log(process.env.JWT_KEY);
});

app.listen(4000, () => {
  console.log(`Server is listening on port ${PORT}! 🚀`);
  connectDB();
});

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found!"));
});

app.use((err, req, res, next) => {
  let { status = 500, message = "Something Went Wrong!" } = err;
  res.status(status).render("error.ejs", { message });
});
