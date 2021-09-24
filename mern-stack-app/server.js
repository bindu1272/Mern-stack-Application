require("dotenv").config();
const express = require("express");
const cors = require('cors');
const port = process.env.PORT || 3000;
const app = express();
const path = require('path'); 
const logger = require('morgan');
const connection = require("./database");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended : false,
    limit : "50mb"
}));
//view engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

//logging
app.use(logger('dev'));

//use connection in app for global use
app.use((req,res,next)=>{
    req.connection = connection;
    next();
})

//routing
const routes = require('./routes');
app.use("/api",routes.user);

app.get("/",(req,res)=>{
    res.send("hello world");
});


app.listen(port,()=>{
    console.log("server is running on "+port);
});