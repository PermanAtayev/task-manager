require('./db/mongoose');

const auth = require('./middleware/auth');
const express = require('express');
const app = express();
const port = process.env.port || 3000;

const UserRouter = require("./routers/user");
const TaskRouter = require("./routers/task");
const jwt = require( "jsonwebtoken" ); 

// middleware for the route handler

app.use((req, res, next) => {
    // console.log( req.method, req.path );
    next();
});

app.use(express.json());
app.use(UserRouter);
app.use(TaskRouter);


app.listen( port, () => {
    console.log("Listening on port - ", port);
});

const Task = require("./models/task");
const User = require("./models/user");

const main = async() => {
    // const task = await Task.findById("5d1f508c497c253e58ecb3a8");
    // await task.populate('owner').execPopulate();
    // console.log(task.owner);

    const user = await User.findById("5d1f4f7797b41a32d42171d1");
    await user.populate("tasks").execPopulate();    
    // console.log(user.tasks);
}

main();