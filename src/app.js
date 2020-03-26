const express = require('express');
const path=require('path');
const exphbs=require('express-handlebars');
const app=express();

app.use(express.urlencoded({extended: true}));


app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'), //path.join junta directorios en diferentes sistemas
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs'); 


app.use(require('./routes/users.routes'));
app.use(require('./routes/entrances.routes'));

module.exports=app;