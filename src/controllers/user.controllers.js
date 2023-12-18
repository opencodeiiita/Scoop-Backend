import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import upload from '../middlewares/imageUpload.middleware.js';
import cloudinaryConfig from '../config/cloudinaryConfig.js';

import { response_200, response_201, response_204, response_400, response_401, response_404, response_500 } from "../utils/responseCodes.js";


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
      return response_400(res, "User already exists");
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
    
    return response_500(res, "Error in Registering", err);
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
    return response_500(res, "Error in Loggin in", err);
  }
}


export async function allUsers(req, res) {
  try {
    const allUser = await User.find({});
    if (!allUser) {
      response_204(res,"No Users Found");
    }
      response_200(res,"All User Sent",allUser)
  } catch (error) {
    console.log(error);
  }
}


export async function registerUser(req, res){
  try {
    // Multer middleware to handle file uploads
    upload.single('file')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: 'File upload error', error: err.message });
      }

      // If a file is uploaded, upload to Cloudinary
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.buffer, { folder: 'user_files' });
        req.body.fileUrl = result.secure_url;
      }

      // Create user with the provided data (including image URL)
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        // Add other user properties as needed
        fileUrl: req.body.fileUrl, // Using Cloudinary file URL instead of profile URL
      });
      await newUser.save();

      return res.status(201).json({ message: 'User registered successfully', user: newUser });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export async function findUser(req, res) {
  try {
    const user = await User.findById(req.params.userId);
    if (user===null) {
      response_204(res,"User Not Found");
    }
    else {
      response_200(res,"User Details Sent",user)
    }
  } catch (error) {
    response_500(res,"Error",error);
  }
}

export async function upVote(req, res) {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      response_404(res,'User not found')
    }
    const hasUpvoted = user.myUpvotes.includes(req.userId);
    if (hasUpvoted) {
      response_400(res,'User has already upvoted')
    }
    user.myUpvotes.push(req.userId);
    await user.save();
    response_200(res,'Upvote successful',null,null);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export async function deleteUser(req, res) {
  try {
    const id = req.params.userId;
    const result = await User.findByIdAndRemove(id).exec();
    if (!result) {
      response_404(res,'User not found');
      return;
    }
    console.log(result);
    response_200(res,"Deleted the User",null,null);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });

  }
}
