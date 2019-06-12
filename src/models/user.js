const mongoose = require('mongoose');
const url = "mongodb://127.0.0.1:27017/task-manager-api";
const validator = require('validator');

mongoose.connect( url, {useNewUrlParser: true});

const User = mongoose.model( "User", {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        validate(value){
            if( !validator.isEmail( value ) ){
                throw new Error("Email is not valid");
            }
        },
        trim: true,
        lowercase: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if( value < 0 )
                throw new Error("Age can't be negative");
        }
    },
    password: {
        type: String,
        trim: true,
        minlength: 6,
        validate(value){
            if( value === "password" )
                throw new Error("You can't choose password for \"password\"");
        },
        required: true
    }
})

module.exports = User;


// {
// 	"name" : "Perman Atayev",
// 	"email" : "permanuss99@gmail.com",
// 	"password" : "qwerty"
// }
