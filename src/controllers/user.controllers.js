import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
const upload = require('./multerMiddleware');
const cloudinary = require('./cloudinaryConfig');
const User = require('./models/user');

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
}

export async function registerUser(req, res){
  try {
    // Multer middleware to handle file uploads
    upload.single('image')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: 'File upload error', error: err.message });
      }

      // If a file is uploaded, upload to Cloudinary
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.buffer, { folder: 'user_images' });
        req.body.image = result.secure_url;
      }

      // Create user with the provided data (including image URL)
      const newUser = new User(req.body);
      await newUser.save();

      return res.status(201).json({ message: 'User registered successfully', user: newUser });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
