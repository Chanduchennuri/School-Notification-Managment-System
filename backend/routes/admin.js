const express = require('express')
const router = express.Router()

router.get('/teachers',async (req,res)=> {
    if(req.session.role==='admin'){
        const {getAllT} = require('../controllers/teacher')
        res.json(await getAllT())
    }
    else{
        res.json({})
    }
})

module.exports = router