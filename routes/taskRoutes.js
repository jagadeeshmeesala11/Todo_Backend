const express = require("express");
const router = express.Router();
const { AppDataSource } = require("../connection");
const Task = require("../Entity/Task");

router.get("/", async (req, res) => {
  try {
    const taskRepo = AppDataSource.getRepository(Task);
    const tasks = await taskRepo.find();
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || typeof id !== "string") {
      return res.status(400).json({ message: "Invalid task ID" });
    }

    const taskRepo = AppDataSource.getRepository(Task);
    const task = await taskRepo.findOneBy({ id });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    console.error("Error fetching task by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});



router.post("/", async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;

    
    if (!title || !status) {
      return res.status(400).json({ message: "Title and status are required" });
    }

    const taskRepo = AppDataSource.getRepository(Task);

    const newTask = taskRepo.create({
      title,
      description,
      status,
      dueDate: dueDate ? new Date(dueDate) : null,
    });

    const savedTask = await taskRepo.save(newTask);
    res.status(201).json(savedTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});



router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, dueDate } = req.body;

    const taskRepo = AppDataSource.getRepository(Task);
    const task = await taskRepo.findOneBy({ id });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

  
    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.status = status ?? task.status;
    task.dueDate = dueDate ? new Date(dueDate) : task.dueDate;

    const updatedTask = await taskRepo.save(task);
    res.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});



router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const taskRepo = AppDataSource.getRepository(Task);

    const result = await taskRepo.delete({ id });

    if (result.affected === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = router;
