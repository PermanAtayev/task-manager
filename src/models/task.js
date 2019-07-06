const mongoose = require('mongoose');
const url = "mongodb://127.0.0.1:27017/task-manager-api";

mongoose.connect(url, { useNewUrlParser: true });

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true 
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        // to create the relationship between the user and the task
        ref: 'User'
    }
})

taskSchema.pre( "save", async function(next){
    const task = this;
    console.log( "Task is being modified" );
    next();
})

const Task = mongoose.model("Task", taskSchema );


module.exports = Task;
