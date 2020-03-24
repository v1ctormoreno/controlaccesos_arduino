const express = require('express');
const path=require('path');
const exphbs=require('express-handlebars');

const UID=require('./models/UID');
const app=express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

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
app.get('/see/uid', async(req, res) => {
    const uids=await UID.find();
    console.log(uids);
    
    res.render('pages/seeUID', {uids})
});

module.exports=app;