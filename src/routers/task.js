const express = require("express");
const router = express.Router();
const Task = require('../models/task');


router.post("/tasks", async (req, res) => {
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

router.get("/tasks", async (req, res) => {
    try{
        const tasks = await Task.find({});
        return res.status(200).send( tasks );
    }
    catch( error ){
        return res.status(500).send( "An error occured" );
    }
})

router.get("/tasks/:id", async (req, res) => {
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

router.patch( "/tasks/:id", async (req, res) => {
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

router.delete( "/tasks/:id", async (req, res) => {
    const _id = req.params.id;

    try{
        const task = await Task.findByIdAndDelete( _id );

        if( !task )
            res.status(404).send("Task was not found");
        
        res.status(200).send(task);
    }
    catch(e){
        res.status(500).send(e + "");
    }
});

module.exports = router;