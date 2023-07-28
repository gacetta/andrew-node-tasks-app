const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.send.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log(`server is running on port: ${port}...`);
});

const Task = require("./models/task");
const User = require("./models/user");

const main = async () => {
  // const task = await Task.findById("64c419e2add5e9e96742463b");
  // await task.populate("owner");
  // console.log(task);

  const user = await User.findById("64c4210e81c9777a725f82fa");
  await user.populate("tasks");
  console.log(user.tasks.map((task) => task.description));
};

main();
