import mongoose from "mongoose";
const { Schema, model } = mongoose;
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
dotenv.config();

const userSchema = new Schema(
  {
    FirstName: {
      type: String,
      required: true,
    },
    LastName: {
      type: String,
      required: true,
    },
    UserName: {
      type: String,
      required: true,
      unique: true,
    },
    ProfileImage: {
      type: String,
      default: "https://i.pinimg.com/736x/8a/c3/f9/8ac3f9735abb4b0197ee838735715833.jpg",
    },
    Email: {
      type: String,
      required: true,
    },
    Password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    myUpvotes: [  // which users have upvoted on this user
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    News: [   // this user has created which news
      {
        type: Schema.Types.ObjectId,
        ref: "News",
      },
    ],
  },
  { timestamps: true },
);

userSchema.pre("save", async function (next) {
  console.log(this);
  const user = this;
  try {
    const salt = await bcrypt.genSalt(10);
    const newPass = await bcrypt.hash(user.Password, salt);
    user.Password = newPass;
  } catch (err) {
    next(err);
  }
});

userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        FirstName: this.FirstName,
        LastName: this.LastName,
        UserName: this.UserName,
        ProfileImage: this.ProfileImage,
        Email: this.Email,
        isAdmin: this.isAdmin,
        myUpvotes: this.myUpvotes,
        News: this.News,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "30d",
      },
    );
  } catch (err) {
    console.log(err);
  }
};

const User = model("User", userSchema);

export default User;
