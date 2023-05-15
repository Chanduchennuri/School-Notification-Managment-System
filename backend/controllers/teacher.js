const teacher = require('../models/teacher')

async function createTeacher(email,fName,lName,phone){
    await teacher.create({
        email:email,
        fName:fName,
        lName:lName,
        phone:phone
    })
    .then(()=>{
        return true
    })
    .catch((err) => {
        console.log(err)
        return false
    })
}

async function findByEmailT(email){
    const docs = await teacher.findOne({email:email})
    .catch((err) => {
        console.log(err)
    })
    return docs
}

async function getAllT(){
    const docs = await teacher.find({})
    .catch((err) => {
        console.log(err)
    })
    return docs
}



module.exports = {createTeacher , findByEmailT, getAllT}