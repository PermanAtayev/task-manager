const mongoose = require('mongoose');
const url = "mongodb://127.0.0.1:27017/task-manager-api";
const validator = require('validator');
const bcrypt = require("bcryptjs");

mongoose.connect(url, { useNewUrlParser: true });

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is not valid");
            }
        },
        trim: true,
        lowercase: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0)
                throw new Error("Age can't be negative");
        }
    },
    password: {
        type: String,
        trim: true,
        minlength: 6,
        validate(value) {
            if (value === "password")
                throw new Error("You can't choose password for \"password\"");
        },
        required: true
    }
}
);

userSchema.pre("save", async function(next){
    // console.log( this );
    const user = this;

    if(user.isModified('password')){
        console.log("Something was modified");
        user.password = await bcrypt.hash(user.password, 8);
        console.log( user.password );
    }

    // important, because pre is a middleware that needs to point to the function that will be executed next
    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
