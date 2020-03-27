const router = require('express').Router();
const Entrance=require('../models/Entrance');
const UID=require('../models/UID');
router.get('/see/entrances', (req,res) => {
    Entrance.find({}, async (err, entranceStored) => {
        if(err){
            res.send('Errror DB');
        } else {
            //console.log(entranceStored);
            let finalEntrances = [];
            await entranceStored.forEach(async(entranceElement) => {
                const result = await UID.findOne({uid: entranceElement.uid})
                    .then(userStored => {
                        if(userStored){
                            console.log(userStored);
                            entranceElement.name = userStored.name;
                            entranceElement.lastname = userStored.lastname;
                            finalEntrances.push(JSON.parse(JSON.stringify(entranceElement)));
                        }
                    })
            });
            console.log(finalEntrances);
            res.render('../views/pages/entrances', {entrance: finalEntrances});
        }
    })
}) 

module.exports = router;