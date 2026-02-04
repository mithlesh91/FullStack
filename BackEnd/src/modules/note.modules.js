const mongoose = require('mongoose')

const mithlesh =  new mongoose.Schema({
    title:String,
    discription:String
})

const notemodel = mongoose.model("mama",mithlesh)

module.exports = notemodel;