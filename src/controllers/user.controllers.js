import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export async function register(req, res) {
  try {
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
}

export async function login(req, res) {
  try {
    const { Password } = req.body;
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
}
