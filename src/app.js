const express = require('express');
const path=require('path');
const exphbs=require('express-handlebars');
const moment=require('moment');
const UID=require('./models/UID');
const app=express();

app.use(express.urlencoded({extended: true}));


function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }

app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'), //path.join junta directorios en diferentes sistemas
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
}));
app.set('view engine', '.hbs'); 
app.get('/', (req, res)=>{
    res.render('pages/index');
});
app.get('/new/uid', (req, res)=>{
    res.render('pages/newUID');
});
app.post('/new/uid', (req, res)=>{
    UID.create(req.body, (err, uidStored)=>{
        if(err){
            res.send('Error: '+err);
        } else{
            res.redirect('/see/uid');
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

app.get('/delete/:uid', (req, res)=> {
    UID.deleteOne({uid: req.params.uid}, (err) =>{
        if(err){
            res.send('Error interno DB');
        } else {
            res.redirect('/see/uid');
        }
    })
})

module.exports=app;