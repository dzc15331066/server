const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require('cors');
const mongoose = require('mongoose');
const uuid = require('uuid');
const expressJwt = require('express-jwt');

//routes
const users = require('./routes/users');

//port no
const port = 3000;

const app = express();

//generate a random secretkey
process.env.SECRET_KEY = uuid.v4();

//connect to mongodb
mongoose.connect('mongodb://localhost:27017/users',{
    useMongoClient:true,
});

//on connection
mongoose.connection.on('connected',()=>{
    console.log('Connected to database mongodb @ 27017');
});

//on err
mongoose.connection.on('error',(err)=>{
    if(err){
        console.log('error in database connection'+err);
    }
});

app.use(cors());

//Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//use JWT auth to secure the api, the token can be passed in the authorization header or querystring
app.use(expressJwt({
    secret: process.env.SECRET_KEY,
    getToken: function(req) {
        if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer'){
            return req.headers.authorization.split(' ')[1];
        }
        else if(req.query && req.query.token){
            return req.query.token;
        }
        return null;
    }
}).unless({path: ['/api/users/authenticate/', '/api/users/register/']}));

//use routes
app.use('/api/users',users);

//listen to port
app.listen(port,function(){
    console.log('Server started at port: '+port);
});