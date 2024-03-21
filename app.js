const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { corsOptions } = require('./config/config'); 

/***  API ROUTE ***/
const apiRoutes = require("./routes/api");


/*** Use body parser middleware to parse body of incoming requests ***/
app.use(bodyParser.urlencoded( { extended: false }));
app.use(express.json());
app.use(cors(corsOptions));

/*** DEFINE THE API ROUTE ***/
app.use("/api",apiRoutes);

app.use('/', (req,res)=>{
    res.send('API IS WORKING')
});


/*** MANAGE ERROR IF ROUTE DOESN'T EXIST ***/
app.use((req,res,next)=>{
    const error = new Error();
    error.message = "NOT FOUND"; 
    error.status =  404
    next(error);
});

app.use((error,req,res) =>{
    res.status(error.status || 500).json({ error: error});
});

module.exports = app;
