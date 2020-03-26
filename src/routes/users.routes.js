const router = require('express').Router();
const UID=require('../models/UID');


router.get('/', (req, res)=>{
    res.render('pages/index');
});
router.get('/new/uid', (req, res)=>{
    res.render('pages/newUID');
});
router.post('/new/uid', (req, res)=>{
    UID.create(req.body, (err, uidStored)=>{
        if(err){
            res.send('Error: '+err);
        } else{
            res.redirect('/see/uid');
        }
    });
});
router.get('/get/uid/:uid', (req, res)=>{
    UID.findOne({uid: req.params.uid}, (err, uidStored)=>{
        if(err){
            res.send('Error:' +err);
        } else{
            if(!uidStored){
                res.send("Este ID no existe");
            } else {
                res.send(uidStored);
            }
        } 
    })
});

router.get('/see/uid', (req, res) => {
    UID.find({}, (err, uidStored) => {
        if(err){
            res.send('Error interno DB');
        } else {
            console.log(uidStored);
            let finalUIDs = [];
            uidStored.forEach((uidElement) => {
                finalUIDs.push(JSON.parse(JSON.stringify(uidElement)));
            });
            UID.find({}, 'timestamps'), (err, dateStored) => {
                if(err){
                    console.log("Error");
                } else {
                    console.log(dateStored);
                }
            }
            console.log(finalUIDs);
            res.render('pages/seeUID', {uids: finalUIDs});
            
        }
    })
});

router.get('/delete/:uid', (req, res)=> {
    UID.deleteOne({uid: req.params.uid}, (err) =>{
        if(err){
            res.send('Error interno DB');
        } else {
            res.redirect('/see/uid');
        }
    })
})

module.exports = router;