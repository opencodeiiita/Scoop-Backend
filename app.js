import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.config.js";

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

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}! 🚀`);
  connectDB();
});
