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

module.exports=app;