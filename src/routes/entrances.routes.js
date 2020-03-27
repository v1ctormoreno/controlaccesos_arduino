const router = require('express').Router();
const Entrance=require('../models/Entrance');
const UID=require('../models/UID');
const pool=require('../database');
router.get('/see/entrances', (req,res) => {
    console.log(req.query);
    let extra_query;
    let filter_desc=false;
    if(!req.query.filter){
        extra_query='';
    }else{
        extra_query=`ORDER BY entrance_id ${req.query.filter}`;
        if(req.query.filter==='DESC'){
            filter_desc=true;
        }
    }
    pool.query(`SELECT * FROM entrances JOIN users ${extra_query}`, async (err, entranceStored) => {
        if(err){
            res.send('Errror DB');
        } else {
            //console.log(entranceStored);
            console.log(entranceStored);
            res.render('../views/pages/entrances', {entrance: entranceStored, filter: req.query.filter, filter_desc});
        }
    })
}) 

module.exports = router;