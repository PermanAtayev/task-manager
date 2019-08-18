const express = require('express');
const app = express();
require('./db/mongoose');
const UserRouter = require("./routers/user");
const TaskRouter = require("./routers/task");

app.get("/", (req, res) => {
    return res.send("Welcome to the task-manager api, for the documentation how to use it go to: https://github.com/PermanAtayev/task-manager");
})

app.use(express.json());
app.use(UserRouter);
app.use(TaskRouter);

module.exports = app;