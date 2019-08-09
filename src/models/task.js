const mongoose = require('mongoose');
const url = MONGODB_URL;

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
},
    {
        timestamps: true
    })

taskSchema.pre("save", async function (next) {
    const task = this;
    // console.log("Task is being modified");
    next();
})

const Task = mongoose.model("Task", taskSchema);


module.exports = Task;
