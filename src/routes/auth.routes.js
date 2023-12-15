import express from "express";
const router = express.Router();
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
const { jwt } = "jsonwebtoken";

router.get("/register", (req, res) => {
  res.send("Hii");
});

router.post("/register", async (req, res) => {
  try {
    const data = req.body;
    const {
      FirstName,
      LastName,
      UserName,
      ProfileImage,
      Email,
      Password,
      isAdmin,
      myUpvotes,
      News,
    } = req.body;

    const existingUser = await User.findOne({ UserName: req.body.UserName });
    if (existingUser) {
      res.status(400).send("User already exists");
    }

    //Save
    const userCreated = await User.create({
      FirstName,
      LastName,
      UserName,
      ProfileImage,
      Email,
      Password,
      isAdmin,
      myUpvotes,
      News,
    });

    res
      .status(201)
      .json({ msg: "Saved", token: await userCreated.generateToken() });
  } catch (err) {
    console.log(err);
  }
});

router.get("/login", (req, res) => {
  res.send("LOgin");
});

router.post("/login", async (req, res) => {
  try {
    const { UserName, Password } = req.body;
    //console.log(Password);
    const existUser = await User.findOne({ UserName: req.body.UserName });
    //console.log(existUser);
    if (!existUser) {
      res.status(400).send("User Not Found");
    }
    const passValid = await bcrypt.compare(Password, existUser.Password);
    //console.log(passValid);
    if (passValid) {
      res
        .status(201)
        .json({ msg: "UserFound", token: await existUser.generateToken() });
    } else {
      res.status(401).json({ msg: "Inavalid Credentials" });
    }
  } catch (error) {
    console.log(error);
  }
});

export default router;
