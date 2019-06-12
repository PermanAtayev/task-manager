require('./db/mongoose');

const express = require('express');
const app = express();
const port = process.env.port || 3000;
const User = require('./models/user');
const Task = require('./models/task');

app.use(express.json());

app.post( "/users", (req, res) => {
    const user = new User( req.body );

    user.save().then(( result ) => {
        console.log( user );
        return res.status(200).send( "User is created" );
    })
    .catch( (error) =>{
        console.log( error );
        return res.status(406).send( "User is not created" );
    })
})

app.get( "/users", (req, res) => {
    User.find({}).then((users) => {
        return res.status(200).send( users );
    }).catch((e) => {
        return res.status(500).send("No users");
    })
})

app.get( "/users/:id", (req, res) => {
    const _id = req.params.id;

    User.findById(_id).then((user) => {
        if( user )
            return res.send(user);

        return res.status(404).send("User was not found");
    })
    .catch((e) => {
        return res.status(500).send("Something went wrong");
    })
})

app.post("/tasks", (req, res) => {
    const task = new Task( req.body );

    task.save().then((success)=>{
        console.log( task );
        return res.status(200).send( "Task is created" );
    })
    .catch((error) => {
        console.log( error );
        return res.status(406).send( "Task is not created" );
    })
})

app.get("/tasks", (req, res) => {
    Task.find({}).then((tasks) => {
        return res.status(200).send( tasks );
    })
    .catch( (e) => {
        return res.status(500).send( "An error occured" );
    })
})

app.get("/tasks/:id", (req, res) => {
    const _id = req.params.id;
    Task.findById(_id).then((task) => {
        if( task )
            return res.status(201).send(task);
        return res.status(404).send("Could not find a task");
    })
    .catch((e) => {
        return res.status(500).send("Server error");
    })
})

app.listen( port, () => {
    console.log("Listening on port - ", port);
});

