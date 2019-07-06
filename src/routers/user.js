const express = require("express");
const router = new express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth');

// sign-up
router.post("/users", async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        const token = await user.generateAuthToken();
        return res.status(201).send({ user, token });
    }
    catch (error) {
        return res.status(406).send(error);
    }
})

// log-in
router.post("/users/login", async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({user, token});
    }
    catch (e) {
        res.status(400).send(e + "");
    }
});

router.post("/users/logout", auth, async(req, res) => {
    try{
        req.user.tokens = req.user.tokens.filter( (token) => {
            return ( token.token !== req.token );
        })
        await req.user.save();
        return res.status(200).send("You logged out");
    }
    catch(e){
        return res.status(500).send( "" + e );
    }
})

router.post("/users/logoutAll", auth, async(req, res) => {
    try{
        req.user.tokens = [];
        await req.user.save();
        return res.status(200).send("You logged out from all of your accounts");
    }
    catch(e){
        return res.status(500).send( "" + e );
    }
})

router.get("/users", async (req, res) => {
    try {
        const user = req.user;
        const users = await User.find({});
        return res.status(200).send(users);
    }
    catch (e) {
        return res.status(500).send("No users");
    }
})

router.get("/users/me", auth, async (req, res) => {
    res.send(req.user);
})

//update a user
router.patch("/users/me", auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) 
        return res.status(400).send("Invalid update");

        try {
        const user = req.user;
        updates.forEach((update) => {
            user[update] = req.body[update];
        })
        await user.save();
        return res.status(201).send(user);
    }
    catch (error) {
        res.status(400).send(error);
    }
})

//delete a user
router.delete("/users/me", auth, async (req, res) => {
    try {
        await req.user.remove();
        return res.status(200).send(req.user);
    }
    catch (e) {
        return res.status(500).send(e);
    }
})

module.exports = router;