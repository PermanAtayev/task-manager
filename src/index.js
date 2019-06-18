require('./db/mongoose');

const express = require('express');
const app = express();
const port = process.env.port || 3000;


const UserRouter = require("./routers/user");
const TaskRouter = require("./routers/task");

app.use(express.json());
app.use(UserRouter);
app.use(TaskRouter);


app.listen( port, () => {
    console.log("Listening on port - ", port);
});

const bcrypt = require( "bcryptjs" );

const myFunction = async() => {
    const password = "Red12345!";
    const hashedPassword = await bcrypt.hash( password, 8);

    const isMatch = await bcrypt.compare( "Red1234!", hashedPassword );
}

myFunction();
