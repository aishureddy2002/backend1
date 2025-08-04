// backend/controllers/taskController.js
import Task from "../models/Task.js";

// ✅ GET all tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    console.error("❌ Failed to fetch tasks:", err.message);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

// ✅ POST /tasks → Create a new task
export const createTask = async (req, res) => {
  try {
    const { text } = req.body; // ✅ Mongoose expects "text", not "title"

    if (!text || text.trim() === "") {
      return res.status(400).json({ error: "Task text is required" });
    }

    const task = new Task({ text }); // ✅ Matches schema field
    const savedTask = await task.save();

    console.log("✅ Task saved to MongoDB:", savedTask);
    res.status(201).json(savedTask);
  } catch (err) {
    console.error("❌ Failed to create task:", err.message);
    res.status(500).json({ error: "Failed to create task" });
  }
};

// ✅ DELETE /tasks/:id → Delete task by ID
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.status(204).send(); // No content
  } catch (err) {
    console.error("❌ Failed to delete task:", err.message);
    res.status(500).json({ error: "Failed to delete task" });
  }
};
