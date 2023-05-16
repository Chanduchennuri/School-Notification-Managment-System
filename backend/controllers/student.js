const student = require('../models/student')

async function createStudent(email,
    parentEmail,
    fName,
    pName,
    lName,
    sPhone,
    pPhone) {
    const { findByEmailT } = require("./teacher")
    let createdOrNot
    if (await findByEmailS(email) ||
        await findByEmailS(parentEmail) ||
        await findByEmailP(email) ||
        await findByEmailP(parentEmail) ||
        await findByEmailT(email) ||
        await findByEmailT(parentEmail)) {
        createdOrNot = false
    }
    else {
        await student.create({
            email: email,
            parentEmail: parentEmail,
            fName: fName,
            pName: pName,
            lName: lName,
            sPhone: sPhone,
            pPhone: pPhone
        })
            .then(() => {
                createdOrNot = true
            })
            .catch((err) => {
                console.log(err)
                createdOrNot = false
            })
    }
    return createdOrNot
}

async function updateStudent(email,
    fName,
    pName,
    lName,
    sPhone,
    pPhone) {

    let docs
    await student.updateOne({ email: email },
        {
            fName: fName,
            pName: pName,
            lName: lName,
            sPhone: sPhone,
            pPhone: pPhone
        })
        .then((e) => {
            docs = e
        })
        .catch((err) => {
            console.log(err)
        })
    return docs

}

async function findByEmailS(email) {
    const docs = await student.findOne({ email: email })
        .catch((err) => {
            console.log(err)
        })
    return docs
}

async function findByEmailP(email) {
    const docs = await student.findOne({ parentEmail: email })
        .catch((err) => {
            console.log(err)
        })
    return docs
}

async function getAllSByClas(clas) {
    const docs = await student.find({ class: clas })
        .catch((err) => {
            console.log(err)
        })
    return docs
}

async function getAllS() {
    const docs = await student.find({})
        .catch((err) => {
            console.log(err)
        })
    return docs
}

async function updateClassS(email, clas) {
    let isSuccess
    const { checkClasExist } = require('./class')
    if (await checkClasExist(clas)) {
        const result = await student.updateOne({ email: email }, { class: clas })
            .catch((err) => {
                console.log(err)
                isSuccess = false
            })
        if (result) {
            isSuccess = true
        }
        else {
            isSuccess = false
        }
    }
    else {
        isSuccess = false
    }
    return isSuccess
}

module.exports = { updateStudent , updateClassS, getAllSByClas, getAllS, createStudent, findByEmailS, findByEmailP }