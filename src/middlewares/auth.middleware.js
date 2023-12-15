import user from "../models/user.model.js";
import jwt from "jsonwebtoken";

const verifyToken = util.promisify(jwt.verify);

// next() is the next middleware to be executed
const isAdmin = async (req, res, next) => {
  const { UserName } = req.body;

  try {
    const admin_attempt = await user.findOne({ UserName: UserName });

    if (admin_attempt && admin_attempt.isAdmin === true) {
      next();
    } else {
      return res
        .status(403)
        .json({ success: false, message: "User does not have Admin status" });
    }
  } catch (error) {
    console.error("Error checking admin status:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const validateToken = async (req, res, next) => {
  let token
  let authHeader = req.headers.Authorization || req.headers.authorization
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1]
    try {
      const decoded = await verifyToken(token, process.env.ACCESS_TOKEN_SECRET)
      req.user = decoded.user
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

export default { isAdmin, validateToken };
