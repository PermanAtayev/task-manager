require('./db/mongoose');

const auth = require('./middleware/auth');
const express = require('express');
const app = express();
const port = process.env.PORT;

const UserRouter = require("./routers/user");
const TaskRouter = require("./routers/task");

app.use(express.json());

app.get("/", (req, res) => {
    return res.send("Welcome to the task-manager api, for the documentation how to use it go to: https://github.com/PermanAtayev/task-manager");
})

app.use(UserRouter);
app.use(TaskRouter);


app.listen(port, () => {
    console.log("Listening on port -", port);
});
