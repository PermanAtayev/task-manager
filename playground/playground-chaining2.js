require('../src/db/mongoose')
const Task = require('../src/models/task');

//5cff8e9abdade7266c5f0d8f
const id = "5cff8e9abdade7266c5f0d8f";

Task.findByIdAndRemove(id)
.then( (task) => {
    console.log( task );
    return Task.countDocuments({completed: false});
})
.then( (tasks) => {
    console.log( tasks );
})
.catch( (e) => {
    console.log( e ); 
})
