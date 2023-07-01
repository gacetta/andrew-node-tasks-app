const express = require('express');
const router = new express.Router();
const User = require('../models/user');


router.get('/test', (req, res) => {
  res.send('From a new file');
})

router.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
  
    await user.save();
    res.status(201).send(user);
  }
  catch (error) {
    res.status(400).send(error);
  }
});

router.get('/users/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.findById(_id);
    res.status(200).send(user);
  } catch(error) {
    res.sendStatus(500);
  }

  // User.findById(_id).then((user) => {
  //   res.status(200).send(user);
  // }).catch((err) => {
  //   res.sendStatus(500);
  // })
})

router.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch(error) {
    res.sendStatus(500);
  }
})

router.patch('/users/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['email', 'name', 'password', 'age']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) return res.status(400).send({error: 'invalid updates'})

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true, });


    if (!user) return res.sendStatus(404);
    res.send(user);
  } catch (err) {
    res.sendStatus(400);
  }
})

module.exports = router;

