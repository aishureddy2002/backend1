import Task from "../models/Task.js";

// Get all tasks
export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch tasks" });
    }
};

export const createTask = async (req, res) => {
    try {
        const { title } = req.body;
        const task = new Task({ title });
        await task.save();
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ error: "Failed to create task" });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        await Task.findByIdAndDelete(id);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: "Failed to delete task" });
    }
};
