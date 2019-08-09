const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false)

mongoose.connect(process.env.MONGODB_URL,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: true
    }
);