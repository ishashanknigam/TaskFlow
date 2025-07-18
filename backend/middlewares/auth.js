const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authMiddleware = async (req, res, next) => {
  //grab bearer token from authorization header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ success: false, message: "Not authorized, token missing" });
  }

  const token = authHeader.split(" ")[1];

  //verify and attach user object

  try {
    const payload = jwt.verify(token, "jwt_key");
    const user = await User.findById(payload.id).select("-password");

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found." });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("JWT verification failed.", error);
    res
      .status(401)
      .json({ success: false, message: "Token invalid or expire." });
  }
};

module.exports = authMiddleware;
