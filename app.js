const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config()

const router = require ('./Indexes/userIndex')

const app = express();

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/user' , router)
const user = process.env.MONGO_USER || "qwerty";
const password = process.env.MONGO_PASSWORD || "qwerty";


const uri = `mongodb+srv://${user}:${password}@atlascluster.5wzpbvn.mongodb.net/FleetFuel?retryWrites=true&w=majority`;
const connect = mongoose.connect(uri).then(()=>console.log("Connected to MongoDb"))

module.exports = connect;

const port = process.env.PORT || '2000';

app.listen(port , ()=>{
    console.log(`listen to port ${port}`)
})