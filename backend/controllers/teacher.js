const teacher = require('../models/teacher')

async function createTeacher(){
    await teacher.create({
        email:"fadkeabhi@gmail.com",
        fName:'ABHI',
        lName:'Fadake',
        phone:7083260191

    })
}

async function findByEmail(email){
    const docs = await teacher.findOne({email:email})
    .catch((err) => {
        console.log(err)
    })
    return docs
    
}

module.exports = {createTeacher , findByEmail}