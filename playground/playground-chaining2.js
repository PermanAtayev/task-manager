require('../src/db/mongoose')
const Task = require('../src/models/task');

//5cff8e9abdade7266c5f0d8f
const id = "5d00ee3c62e85d7724c97533";

// Task.findByIdAndRemove(id)
// .then( (task) => {
//     console.log( task );
//     return Task.countDocuments({completed: false});
// })
// .then( (tasks) => {
//     console.log( tasks );
// })
// .catch( (e) => {
//     console.log( e ); 
// })

const removeAndDisplay = async ( id ) => {
    const removedTask = await Task.findByIdAndRemove( id );
    const tasks = await Task.find({});
    return tasks;
}

removeAndDisplay( id ).then( (tasks) => {
    console.log( tasks );
} )
.catch( (e) => {
    console.log( e );
})

