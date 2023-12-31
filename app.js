import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.config.js";


import {v2 as cloudinary} from 'cloudinary';
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

dotenv.config();
const app = express();
import api from "./src/routes/api.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", api);

const PORT = parseInt(process.env.PORT) || 5000;



app.get("/", (req, res) => {
  res.send("Hello World");
  console.log(process.env.JWT_KEY);
});



app.use((err, req, res, next) => {
  let { status = 500, message = "Something Went Wrong!" } = err;
  res.status(status).render("error.ejs", { message });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}! 🚀`);
  connectDB();
});
