const mongoose = require('mongoose')

const clas = new mongoose.Schema({
    clas:{
        type:String,
        required:true
    }
    
})

const CLAS = new mongoose.model('class', clas)
module.exports = CLAS