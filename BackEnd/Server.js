
require('dotenv').config();
const mongoose = require('mongoose')
const app = require('./src/App');
const database = require('./src/config/Database')
database();



app.listen(3000,()=>{
    console.log("port is running")
})