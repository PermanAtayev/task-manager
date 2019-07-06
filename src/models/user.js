const mongoose = require('mongoose');
const url = "mongodb://127.0.0.1:27017/task-manager-api";
const validator = require('validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Task = require("./task");

mongoose.connect(url, { useNewUrlParser: true });

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        unique: true,
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
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});
// not stored in a database
userSchema.virtual("tasks", {
    ref: "Task",
    localField: "_id",
    foreignField: "owner"
})

// now we can use this directly from the model, User.find...

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse');

    if (user.tokens === null)
        user.tokens = [];

    user.tokens = user.tokens.concat({ token });
    // needs to be saved, because we actually update something in the user.tokens array
    await user.save();

    return token;
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Unable to login');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Unable to login, Password is wrong");
    }

    return user;
}

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
}

// hash the plain text password before saving

userSchema.pre("save", async function (next) {
    // console.log( this );
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    // important, because pre is a middleware that needs to point to the function that will be executed next
    next();
});

userSchema.pre("remove", async function(next){
    const user = this;
    await Task.deleteMany({owner: user._id});
    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
