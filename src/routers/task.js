const express = require("express");
const router = new express.Router();
const Task = require('../models/task');
const auth = require('../middleware/auth');


router.post("/tasks", auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    });

    try {
        await task.save();
        console.log(task);
        return res.status(200).send(task);
    }
    catch (error) {
        return res.status(406).send("Task is not created because: " + error);
    }
})

// GET /tasks?completed=true
// GET /tasks?limit=10&skip=0
// GET /tasks?createdAt:asc
// GET /tasks?sortBy=createdAt:asc
router.get("/tasks", auth, async (req, res) => {
    const match = {};
    const sort = {};

    if(req.query.completed){
        match.completed = JSON.parse(req.query.completed);
    }

    if(req.query.sortBy){
        const parts = req.query.sortBy.split(":");
        sort[parts[0]] = (parts[1]==="asc") ? 1 : -1;
    }

    try {
        // const tasks = await Task.find({owner : req.user._id});
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate();
        return res.status(200).send(req.user.tasks);
    }
    catch (error) {
        return res.status(500).send(error + "");
    }
})

router.get("/tasks/:id", auth, async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findOne({ _id, owner: req.user._id });

        if (task)
            return res.status(201).send(task);

        return res.status(404).send("Your task either does not exist or it is not yours");
    }
    catch (error) {
        return res.status(500).send(error);
    }

})

router.patch("/tasks/:id", auth, async (req, res) => {
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ["completed", "description"];

    let isValidOperation = true;

    updates.forEach((update) => {
        if (!allowedUpdates.includes(update))
            isValidOperation = false;
    })

    if (!isValidOperation) {
        res.status(200).send("Invalid update");
    }

    try {
        const task = await Task.findOne({ _id, owner: req.user._id });

        if (!task)
            return res.status(404).send("Task was not found");

        updates.forEach((update) => {
            task[update] = req.body[update];
        })
        await task.save();

        return res.status(200).send(task);
    }
    catch (e) {
        return res.status(400).send(e);
    }
})

router.delete("/tasks/:id", auth, async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findOneAndDelete({_id, owner: req.user._id});

        if (!task)
            res.status(404).send("Task was not found");

        res.status(200).send(task);
    }
    catch (e) {
        res.status(500).send(e + "");
    }
});

module.exports = router;