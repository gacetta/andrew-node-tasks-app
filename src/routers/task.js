const express = require('express');
const router = new express.Router();
const Task = require('../models/task');

router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks)
  } catch(err) {
    res.sendStatus(500);
  }
})

router.get('/tasks/:id', async (req, res) => {
  try {
    const _id  = req.params.id;
    const task = await Task.findById(_id)
    res.send(task)
  } catch (error) {
    res.sendStatus(500);
  }
})



router.post('/tasks', async (req, res) => {
  try {
    const task = new Task(req.body);
    task.save();
    res.send(task);
  } catch (err) {
    res.sendStatus(400);
  }
})

router.patch('/tasks/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const validUpdates = ['description', 'completed'];
  const isValidUpdate = updates.every((update) => validUpdates.includes(update));
  
  if (!isValidUpdate) return res.status(400).send({error: 'invalid update!'});
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
    if (!task) return res.sendStatus(404);
    res.send(task);
  } catch (err) {
    res.sendStatus(400);
  }
})

module.exports = router;