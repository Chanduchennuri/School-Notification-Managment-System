const clasM = require('../models/clas')

async function checkClasExist(clas){
    const docs = await clasM.findOne({clas:clas})
    if(docs){
        return true
    }
    else{
        return false
    }
}

module.exports = {checkClasExist}