const express = require('express');
const path = require('path');
const morgan = require('morgan')
const exphbs = require('express-handlebars');
const nodemailer = require("nodemailer");
const mailsend = require('./mailer');
const methodOverride = require('method-override');
const pool=require('./database')
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const port = new SerialPort('/dev/ttyACM0', {
    baudRate: 9600
});
const parser = port.pipe(new Readline({
    delimiter: '\n'
}));
const {
    database
} = require('./keys');


// Initiliazations
const app = express();
require('./database');


// Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')

}));
app.set('view engine', '.hbs');

// Middlewares
app.use(express.urlencoded({
    extended: false
}));
app.use(methodOverride('_method'));


app.use(morgan('dev'));
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());



// Routes
app.use(require('./routes/users.routes'));
app.use(require('./routes/entrances.routes'));

//app.use('/entrances', require('./routes/entrances.routes'));
//app.get('/', (req, res) => res.redirect('/'));
// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Server is listenning
app.listen(app.get('port'), () => {
    console.log('Server is running on port ' + app.get('port'));
});
parser.on('data', data => {
            console.log(data);
            uidlog = parseInt(data);
            pool.query(`SELECT * FROM users WHERE uid = ?`, [uidlog], (err, uidStored) => {
                if (err) {
                    console.log(err);
                } else {
                    if (uidStored.length <= 0) {
                        console.log("El UID " + parseInt(data) + " no existe.");
                        port.write('0');
                        mailsend(parseInt(data));
                    } else {
                        const {name, lastname, uid} = uidStored[0];
                        console.log(uidStored[0]);
                        console.log("El UID " + uid + " existe. Y se llama " + name + ' ' + lastname + ".");
                        port.write('1');
                        pool.query('INSERT INTO entrances SET ?', [{uid}], (err) => {
                            if(err){
                                console.log(err);
                            } else{
                                console.log(`${uid} ha sido insertado en la base de datos.`);
                            }
                        });
                        mailsend(uid, name, lastname);
                    }
                }
            });
            });