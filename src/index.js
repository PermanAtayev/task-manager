require('./db/mongoose');

const express = require('express');
const app = express();
const port = process.env.port || 3000;
const User = require('./models/user');
const Task = require('./models/task');

app.use(express.json());

app.post( "/users", async (req, res) => {
    const user = new User( req.body );

    try{
        await user.save();
        console.log( user );
        return res.status(200).send( "User is created" );
    }
    catch(error){
        console.log( error );
        return res.status(406).send( "User is not created" );
    }
})

app.get( "/users", async (req, res) => {

    try{
        const users = await User.find({});
        return res.status(200).send( users );
    }
    catch( e ){
        return res.status(500).send("No users");
    }

 })

app.get( "/users/:id", async (req, res) => {
    const _id = req.params.id;

    try{
        const user = await User.findById( _id );
        if( user )
            return res.send(user);
        return res.status(404).send( "User does not exist" );
    }
    catch( error ){
        return res.status(500).send( "Error with the server" );
    }
})

app.patch( "/users/:id", async (req, res) =>{
    const updates = Object.keys( req.body );
    const allowedUpdates = [ 'name', 'email', 'password', 'age' ];

    const isValidOperation = updates.every((update) => allowedUpdates.includes( update ));

    if( !isValidOperation ){
        return res.status(400).send("Invalid update");
    }

    try{
        // console.log( req );
        const user = await User.findByIdAndUpdate( req.params.id, req.body, {new:true, setDefaultsOnInsert: true, runValidators: true} );

        if( user )
            return res.status(200).send(user);  
        
        return res.status(404).send('User was not found');
    }
    catch( error ){
        res.status(400).send(error);
    }
})

app.delete("users/:id", async ( req, res ) => {
    const _id = req.params.id;

    try{
        const user = await User.findByIdAndDelete( _id );

        if( !user ){
            return res.status(404).send( 'User was not found' );
        }
        return res.status(200).send(user);
    }
    catch(e){
        console.log( e );
        return res.status(500).send(e);
    }
})

app.post("/tasks", async (req, res) => {
    const task = new Task( req.body );

    try{
        await task.save();
        console.log( task );
        return res.status(200).send( "Task is created" );
    }
    catch(error){
        console.log( error );
        return res.status(406).send( "Task is not created" );
    }
})

app.get("/tasks", async (req, res) => {
    try{
        const tasks = await Task.find({});
        return res.status(200).send( tasks );
    }
    catch( error ){
        return res.status(500).send( "An error occured" );
    }
})

app.get("/tasks/:id", async (req, res) => {
    const _id = req.params.id;
    try{
        const task = await Task.findById( _id ); // this is a promise, without await I can't just take it
        if( task )
            return res.status(201).send(task);
        return res.status(404).send("Could not find a task");
    }
    catch(error){
        return res.status(500).send(error);
    }

})

app.patch( "/tasks/:id", async (req, res) => {
    const _id = req.params.id;
    const updates = Object.keys( req.body );
    const allowedUpdates = [ "completed", "description" ];

    let isValidOperation = true;

    updates.forEach( (update) => {
        if( !allowedUpdates.includes( update ))
            isValidOperation = false;
    })

    if( !isValidOperation ){
        res.status(200).send( "Invalid update" );
    }

    try{
        const task = await Task.findByIdAndUpdate( _id, req.body, {new :true, runValidators:true, setDefaultsOnInsert: true, } );

        if( task ){
            return res.status(200).send( task );
        }
        return res.status(404).send("Task was not found");
    }
    catch( e ){
        return res.status(400).send(e);
    }
})

app.listen( port, () => {
    console.log("Listening on port - ", port);
});

