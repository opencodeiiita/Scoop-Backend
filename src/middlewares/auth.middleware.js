import jwt from "jsonwebtoken";

const verifyToken = util.promisify(jwt.verify);

const validateToken = async (req, res, next) => {
  let token
  let authHeader = req.headers.Authorization || req.headers.authorization
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1]
    try {
      const decoded = await verifyToken(token, process.env.JWT_KEY)
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
