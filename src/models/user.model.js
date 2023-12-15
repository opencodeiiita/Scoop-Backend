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
      default: "",
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
    myUpvotes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    News: [
      {
        type: Schema.Types.ObjectId,
        ref: "News",
      },
    ],
  },
  { timestamps: true }
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
      }
    );
  } catch (err) {
    console.log(err);
  }
};

const User = model("User", userSchema);

export default User;
