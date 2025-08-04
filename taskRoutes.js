import express from "express";
import { getTasks, createTask, deleteTask } from "./controllers/taskController.js";

const router = express.Router();

router.get("/", getTasks);
router.post("/", createTask); // ✅ MUST use createTask, not addTask
router.delete("/:id", deleteTask);

export default router;
