const mongoose = require('mongoose');
const url = "mongodb://127.0.0.1:27017/task-manager-api";

mongoose.connect( url, {useNewUrlParser: true});


const Task = mongoose.model( "Task", {
    description: {
        type: String,
        required: true,
        trim: true
    },    
    completed: {
        type: Boolean,
        default: false
    } 
} )

module.exports = Task;
// {
// 	"description": "Launching a web server",
// 	"completed" : false
// }
