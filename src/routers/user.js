const express = require( "express" );
const router = new express.Router();
const User = require('../models/user');

router.get( "/users", async (req, res) => {

    try{
        const users = await User.find({});
        return res.status(200).send( users );
    }
    catch( e ){
        return res.status(500).send("No users");
    }

 })

router.get( "/users/:id", async (req, res) => {
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

router.patch( "/users/:id", async (req, res) =>{
    const updates = Object.keys( req.body );
    const allowedUpdates = [ 'name', 'email', 'password', 'age' ];

    const isValidOperation = updates.every((update) => allowedUpdates.includes( update ));

    if( !isValidOperation ){
        return res.status(400).send("Invalid update");
    }

    try{
        const user = await User.findById( req.params.id, req.body );

        updates.forEach( (update) => {
            user[update] = req.body[update];
        })

        user.save();

        if( user )
            return res.status(200).send(user);  
        
        return res.status(404).send('User was not found');
    }
    catch( error ){
        // console.error(error);
        res.status(400).send(error);
    }
})

router.delete("/users/:id", async ( req, res ) => {
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

router.post( "/users", async (req, res) => {
    const user = new User( req.body );

    try{
        await user.save();
        // console.log( user );
        return res.status(200).send( "User is created" );
    }
    catch(error){
        console.log( error );
        return res.status(406).send( "User is not created" );
    }
})

module.exports = router;