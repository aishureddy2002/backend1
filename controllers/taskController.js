const Task = require('../models/Task');

// Get all tasks
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch tasks" });
    }
};

const createTask = async (req, res) => {
    try {
        const { title } = req.body;
        const task = new Task({ title });
        await task.save();
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ error: "Failed to create task" });
    }
};

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        await Task.findByIdAndDelete(id);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: "Failed to delete task" });
    }
};

module.exports = {
    getTasks,
    createTask,
    deleteTask
};
