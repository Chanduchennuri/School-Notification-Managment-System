const express = require('express')
const router = express.Router()


router.get('/feed/:limit', async(req,res) => {
    //if all feed is requested
    if(!isNaN(req.params.limit)){
        //if limit exist
        const {getFeedByClassWithLimit} = require('../controllers/feed')
        const docs = await getFeedByClassWithLimit(req.session.clas,Number(req.params.limit))
        res.json(docs)
    }
    else{
        //invalid
        res.json({})
    }
    

    // limit = Number(req.params.limit)
    // if(limit>10){
    //     res.json({number : limit})
    // }
    // else{
    //     res.json({string : limit})
    // }

})

module.exports = router