require('./db/mongoose');

const express = require('express');
const app = express();
const port = process.env.port || 3000;

const UserRouter = require("./routers/user");
const TaskRouter = require("./routers/task");

// middleware for the route handler
app.use( (req, res, next) => {
    res.status(503).send( "Server is on maintenance" );
})


// app.use( (req, res, next) => {
//     // console.log( req.method, req.path );

//     if( req.method === "GET" ){
//         res.send( "GET requests are disabled" );
//     }
//     else{
//         next();
//     }
// })

app.use(express.json());
app.use(UserRouter);
app.use(TaskRouter);




app.listen( port, () => {
    console.log("Listening on port - ", port);
});

const jwt = require( "jsonwebtoken" );

const myFunction = async () => {
    const token = jwt.sign( {_id: '5d10b64c2bd85b318cd9a05f'}, 'thisismynewcourse', {expiresIn: "1h"} );
    // console.log( token );

    const data = jwt.verify( token, 'thisismynewcourse' );

    // console.log( data );
}

myFunction()
