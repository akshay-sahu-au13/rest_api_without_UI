const express = require('express');
const MongoInit = require('./config/mongodb');
const PORT= process.env.PORT || 4444;
const bodyParser = require('body-parser');
const userRoute = require('./routes/user');
const app = express();

MongoInit();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api', userRoute);

app.get('/healthcheck', (req, res)=> {
    console.log('Health check passed!');
    res.send("Health Check passed!");
});


app.listen(PORT, ()=> {
    console.log(`Server running on http://localhost:${PORT}`);
});