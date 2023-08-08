const mongoose = require("mongoose");
const User = require("../models/user");
const Task = require("../models/task");

const connectionURL = "mongodb://127.0.0.1:27017"`;
const dbName = "task-manager-api";
mongoose.connect(connectionURL, { dbName });

const me = new User({
  name: "creed",
  email: "myCredoIsWin@gmail.com",
  password: "spASS-wordssss",
});

const toDo = new Task({
  description: "Rock the socks",
});

// toDo.save().then(() => {
//   console.log(toDo);
// }). catch((error) => {
//   console.log(error)
// })
// me.save().then(() => {
//   console.log(me);
// }). catch((error) => {
//   console.log(error)
// })
