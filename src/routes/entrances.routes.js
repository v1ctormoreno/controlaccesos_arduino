const router = require('express').Router();
const Entrance=require('../models/Entrance');
const UID=require('../models/UID');

router.get('/see/entrances', (req,res) => {
    Entrance.find({}, (err, entranceStored) => {
        if(err){
            res.send('Errror DB');
        } else {
            console.log(entranceStored);
            let finalEntrances = [];
            entranceStored.forEach((entranceElement) => {
                finalEntrances.push(JSON.parse(JSON.stringify(entranceElement)));
            });
            console.log(finalEntrances.uid);  
            res.render('../views/pages/entrances', {entrance: finalEntrances});
        }
    })
}) 

module.exports = router;