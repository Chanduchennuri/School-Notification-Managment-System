//Note for testing not used admin authentication remove true from all conditions
const express = require('express')
const router = express.Router()


router.get('/teachers', async (req, res) => {
    if (req.session.role === 'admin') {
        const { getAllT } = require('../controllers/teacher')
        res.json(await getAllT())
    }
    else {
        res.json({})
    }
})

router.post('/teacher/create', async (req, res) => {
    if (req.session.role === 'admin' || true) {
        if (req.body.email &&
            req.body.fName &&
            req.body.lName &&
            req.body.phone) {
            const { createTeacher } = require('../controllers/teacher')
            const createdOrNot = await createTeacher(req.body.email,
                req.body.fName,
                req.body.lName,
                req.body.phone)
            if (createdOrNot === true) {
                res.json({ msg: 'Teacher Created Successfully.' })
            }
            else {
                res.json({ msg: 'Teacher Created Failed.' })
            }

        }
        else {
            res.json({ msg: 'All Fields Are required' })

        }
    }
    else {
        res.json({ msg: 'Admin access only' })
    }
})



router.post('/teacher/update', async (req, res) => {
    if (req.session.role === 'admin' || true) {
        if (req.body.email &&
            req.body.fName &&
            req.body.lName &&
            req.body.phone) {
            const { updateTeacher } = require('../controllers/teacher')
            const docs = await updateTeacher(req.body.email,
                req.body.fName,
                req.body.lName,
                req.body.phone)
            if (docs) {
                res.json({ msg: 'Teacher Updated Successfully.' })
            }
            else {
                res.json({ msg: 'Teacher Updated Failed.' })
            }

        }
        else {
            res.json({ msg: 'All Fields Are required' })

        }
    }
    else {
        res.json({ msg: 'Admin access only' })
    }
})


router.post('/teacher/class/add', async (req, res) => {
    if (req.session.role === 'admin' || true) {
        if (req.body.email &&
            req.body.clas) {
            const { checkClasExist } = require('../controllers/class')
            if (await checkClasExist(req.body.clas)) {
                const { pushClas } = require('../controllers/teacher')
                const docs = await pushClas(req.body.email,
                    req.body.clas)
                if (docs) {
                    res.json({ msg: 'Clas added Successfully.' })
                }
                else {
                    res.json({ msg: 'Clas added Failed.' })
                }
            }
            else {
                res.json({ msg: 'Class not exists' })
            }

        }
        else {
            res.json({ msg: 'All Fields Are required' })

        }
    }
    else {
        res.json({ msg: 'Admin access only' })
    }
})

module.exports = router