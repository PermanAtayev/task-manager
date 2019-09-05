const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../../src/models/user');
const Task = require('../../src/models/task');

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
    _id: userOneId,
    name: "Resul",
    email: "Resuls123@gmail.com",
    password: "Resul123",
    tokens: [{
        token: jwt.sign({ _id: userOneId}, process.env.JWT_SECRET )
    }]
}

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
    _id: userTwoId,
    name: "Ziya",
    email: "ziya@gmail.com",
    password: "ziya123",
    tokens: [{
        token: jwt.sign({_id: userTwoId}, process.env.JWT_SECRET)
    }]
}

const taskOneId = new mongoose.Types.ObjectId();

const taskOne = {
    _id: taskOneId,
    description: "Test task for user 1",
    completed: false,
    owner: userOneId
}

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: "Test task for user 2",
    completed: true,
    owner: userTwoId
}

const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: "Test second task for user 2",
    completed: true,
    owner: userTwoId
}

const setupDatabase = async () => {
    await User.deleteMany();
    await Task.deleteMany();

    await new User(userOne).save();
    await new User(userTwo).save();
    await new Task(taskOne).save();
    await new Task(taskTwo).save();
    await new Task(taskThree).save();
}

module.exports = {
    userOneId,
    userOne,
    taskOneId,
    userTwoId,
    userTwo,
    setupDatabase
}