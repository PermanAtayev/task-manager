require('./db/mongoose');

const auth = require('./middleware/auth');
const express = require('express');
const app = express();
const port = process.env.port || 3000;

const UserRouter = require("./routers/user");
const TaskRouter = require("./routers/task");
const jwt = require( "jsonwebtoken" ); 

app.use(express.json());
app.use(UserRouter);
app.use(TaskRouter);


app.listen( port, () => {
    console.log("Listening on port - ", port);
});
