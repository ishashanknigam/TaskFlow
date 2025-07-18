const express = require("express");
const {
  register,
  login,
  getCurrentUser,
  updateProfile,
  updatePassword,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/auth");

const userRouter = express.Router();

//public routes
userRouter.post("/register", register);
userRouter.post("/login", login);

//private routes with protected routes
userRouter.get("/me", authMiddleware, getCurrentUser);
userRouter.put("/profile", authMiddleware, updateProfile);
userRouter.put("/password", authMiddleware, updatePassword);

module.exports = userRouter;
