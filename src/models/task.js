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
    }
})

taskSchema.pre( "save", async function(next){
    const task = this;
    console.log( "Task is being modified" );
    next();
})

const Task = mongoose.model("Task", taskSchema );


module.exports = Task;
// {
// 	"description": "Launching a web server",
// 	"completed" : false
// }
