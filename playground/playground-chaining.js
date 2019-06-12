require('../src/db/mongoose');
const User = require('../src/models/user');

// mongoose.set('useFindAndModify', false);


//5cff8cab423351173071ac08

const id = "5cff8cab423351173071ac08";

User.findByIdAndUpdate(
    id, 
    {
        age: 0
    }
).then( (user) => {
    // console.log( user );
    return User.countDocuments( { age: 0 } );
}).then( ( users ) => {
    console.log( users );
})
.catch( (e) => {
    console.log( e );
})