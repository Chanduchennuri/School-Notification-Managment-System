const mongoose = require('mongoose')

const studSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    parentEmail:{
        type:String,
        required:true
    },
    fName:{
        type:String,
        required:true
    },
    pName:{
        type:String,
        required:true
    },
    lName:{
        type:String,
        required:true
    },
    sPhone:{
        type:Number,
        required:true
    },
    pPhone:{
        type:Number,
        required:true
    },
    clas:{
        type:String
    }
    
})

const STUD = mongoose.model('stud', studSchema)
module.exports = STUD