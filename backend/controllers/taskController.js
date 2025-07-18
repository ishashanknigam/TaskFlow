const Task = require("../models/taskModel");

//new task
const createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate, completed } = req.body;

    const task = new Task({
      title,
      description,
      priority,
      dueDate,
      completed: completed === "Yes" || completed === true,
      owner: req.user.id,
    });

    const saved = await task.save();

    res.status(201).json({ success: true, task: saved });
  } catch (error) {
    console.log(error);
    res.status9(400).json({ success: false, message: error.message });
  }
};

//get all task
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ owner: req.user.id }).sort({
      createdAt: -1,
    });

    res.json({ success: true, tasks });
  } catch (error) {
    console.log(error);
    res.status9(500).json({ success: false, message: error.message });
  }
};

//get single task by id
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, owner: req.user.id });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found.",
      });
    }

    res.json({ success: true, task });
  } catch (error) {
    console.log(error);
    res.status9(500).json({ success: false, message: error.message });
  }
};

//update task
const updateTask = async (req, res) => {
  try {
    const data = { ...req.body };

    if (data.completed != undefined) {
      data.completed = data.completed === "Yes" || data.completed === true;
    }

    const updated = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: req.user.id,
      },
      data,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res
        .status(404)
        .json({ success: true, message: "Task not found or not yours." });
    }

    res.json({ success: true, task: updated });
  } catch (error) {
    console.log(error);
    res.status9(500).json({ success: false, message: error.message });
  }
};

//delete task
const deleteTask = async (req, res) => {
  try {
    const deleted = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!deleted) {
      res
        .status(404)
        .json({ success: false, message: "Task not found or not yours." });
    }

    res.json({ success: true, message: "Task deleted." });
  } catch (error) {
    console.log(error);
    res.status9(500).json({ success: false, message: error.message });
  }
};

module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask };
