const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const Task = require("../models/task");

router.post("/tasks", auth, async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
      owner: req.user._id,
    });
    await task.save();
    res.status(201).send(task);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

// GET / tasks?completed=false
// GET / tasks?limit=10&skip=20
// GET / tasks?sortBy=createdAt_desc
router.get("/tasks", auth, async (req, res) => {
  const match = {};
  const sort = {};

  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }

  if (req.query.sortBy) {
    [sortBy, sortOrder] = req.query.sortBy.split(":");
    sort[sortBy] = sortOrder === "asc" ? 1 : -1;
  }

  try {
    // const tasks = await Task.find({ owner: req.user._id });
    await req.user.populate({
      path: "tasks",
      match,
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort,
      },
    });

    if (!req.user.tasks) return res.sendStatus(404);

    res.send(req.user.tasks);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findOne({ _id, owner: req.user._id });

    if (!task) return res.sendStatus(404);

    res.send(task);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.patch("/tasks/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const validUpdates = ["description", "completed"];
  const isValidUpdate = updates.every((update) =>
    validUpdates.includes(update)
  );

  if (!isValidUpdate) return res.status(400).send({ error: "invalid update!" });

  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) return res.sendStatus(404);

    updates.forEach((update) => (task[update] = req.body[update]));
    task.save();
    res.send(task);
  } catch (err) {
    res.sendStatus(400);
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const task = await Task.deleteOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) return res.sendStatus(400);

    res.send(task);
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;
