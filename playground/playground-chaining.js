require('../src/db/mongoose');
const User = require('../src/models/user');

// mongoose.set('useFindAndModify', false);
//5cff8cab423351173071ac08

const id = "5cff8d007a2ac130ac444447";

// User.findByIdAndUpdate(
//     id, 
//     {
//         age: 0
//     }
// ).then( (user) => {
//     // console.log( user );
//     return User.countDocuments( { age: 0 } );
// }).then( ( users ) => {
//     console.log( users );
// })
// .catch( (e) => {
//     console.log( e );
// })

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate( id, {age } );
    const number = await User.countDocuments( {age: 0} );
    return number;
}

updateAgeAndCount( id, 0 ).then( (result) =>{
    console.log( result );
} ).catch( (e) => {
    console.log( e );
})