const express = require('express');
const path=require('path');

const UID=require('./models/UID');
const app=express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, '/pages/index.html'));
});
app.get('/new/uid', (req, res)=>{
    res.sendFile(path.join(__dirname, 'pages/newUID.html'));
});
app.post('/new/uid', (req, res)=>{
    UID.create(req.body, (err, uidStored)=>{
        if(err){
            res.send('Error: '+err);
        } else{
            res.send(uidStored);
        }
    });
});
app.get('/get/uid/:uid', (req, res)=>{
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
app.get('/see/uid', (req, res) => {
    let query = {uid: /^S/};
    UID.find({}, (err, foundUID)=>{
        if(err){
            console.log(err);
        } else {
            res.send(foundUID);
        }
    });
});

module.exports=app;