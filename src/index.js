const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.send.PORT || 3000;

// app.use((req, res, next) => {
//   if (req.method === 'GET') {
//     res.status(400).send('GET requests are disabled')
//   } else {
//     next();
//   }
// })

// app.use((req, res, next) => {
//   res.status(503).send('Maintenance - Server is not currently accepting requests')
// })

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log(`server is running on port: ${port}...`);
});

const jwt = require("jsonwebtoken");

const myFunc = async () => {
  const token = jwt.sign({ _id: "abc123" }, "thisismynewcourse", {
    expiresIn: "1h",
  });
  console.log(token);

  const data = jwt.verify(token, "thisismynewcourse");
  console.log(data);
};

myFunc();
