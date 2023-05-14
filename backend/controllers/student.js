const student = require('../models/student')

async function createStudent(){
    await student.create({
        email:"fadkeabhi@gmail.com",
        parentEmail:"fadkeabhi1@gmail.com",
        fName:'ABHI',
        pName:'NAMDEV',
        lName:'Fadake',
        sPhone:7083260191,
        pPhone:1111111111

    })
}

async function findByEmailS(email){
    const docs = await student.findOne({email:email})
    .catch((err) => {
        console.log(err)
    })
    return docs
}

async function findByEmailP(email){
    const docs = await student.findOne({parentEmail:email})
    .catch((err) => {
        console.log(err)
    })
    return docs
}

module.exports = {createStudent , findByEmailS, findByEmailP}