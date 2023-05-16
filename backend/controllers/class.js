const clasM = require('../models/clas')

async function checkClasExist(clas) {
    const docs = await clasM.findOne({ class: clas })
    if (docs) {
        return true
    }
    else {
        return false
    }
}

async function createClas(clas) {
    //check if class exist
    let createdOrNot
    if (await checkClasExist(clas)) {
        createdOrNot = true
    }
    else {
        await clasM.create({
            class:clas
        })
            .then(() => {
                createdOrNot = true
            })
            .catch((err) => {
                console.log(err)
                createdOrNot = false
            })
        return createdOrNot
    }
}


module.exports = { createClas,checkClasExist }