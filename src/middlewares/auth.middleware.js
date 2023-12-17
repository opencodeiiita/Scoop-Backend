import user from "../models/user.model.js";
import jwt from "jsonwebtoken";
import util from 'util';


const validateToken = async (req, res, next) => {
  const authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    const token = authHeader.split(" ")[1]
    try {
      const decoded = jwt.verify(token, process.env.JWT_KEY)
      req.userId = decoded.userId
      next();
    } catch (err) {
      return res
        .status(401)
        .json({ success: false, message: "Not an authorized user" })
    }
  } else {
    return res
        .status(500)
        .json({ success: false, message: "Not an authorized user or token is missing" })
  }
}

export default validateToken
