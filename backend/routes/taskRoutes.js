const express = require("express");
const authMiddleware = require("../middlewares/auth");
const {
  getTasks,
  createTask,
  getTaskById,
  deleteTask,
  updateTask,
} = require("../controllers/taskController");

const taskRouter = express.Router();

taskRouter
  .route("/gp")
  .get(authMiddleware, getTasks)
  .post(authMiddleware, createTask);

taskRouter
  .route("/:id/gp")
  .get(authMiddleware, getTaskById)
  .put(authMiddleware, updateTask)
  .delete(authMiddleware, deleteTask);

module.exports = taskRouter;
