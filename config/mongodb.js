const mongoose = require('mongoose');
const MongoUri = "mongodb+srv://akshay:admin@cluster0.3sl2w.mongodb.net/atlasdb?retryWrites=true&w=majority";

const MongoInit = () => {
    mongoose.connect(MongoUri, {useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex: true}, (err, data)=> {
        if (err) {
            throw err;
        }
        console.log('Connected to MongoDB Atlas...'); 
    });
};

module.exports = MongoInit;
