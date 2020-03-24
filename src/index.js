const app=require('./app');
const UID = require('./models/UID');
const path = require('path');

const mongoose=require('mongoose');
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const port = new SerialPort('/dev/ttyACM0', { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: '\n' }));
const PORT=process.env.PORT || 3000;

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect('mongodb://localhost:27017/controlaccesos', {
       useNewUrlParser: true,
    useUnifiedTopology: true  
}, (err,res)=>{
    if(err) throw err;
    else{
        console.log("Connection to BBDD works");
        app.listen(PORT, ()=>{
            console.log("Webserver is running");
            
        });
    }
});

var autorizados = [15683, 214];
//create a server object:
parser.on('data', data => {
    uidlog = parseInt(data);
    UID.findOne({uid: uidlog}, (err, uidlog) => {
        if (err) {
            console.log(err);
        } else {
            if (!uidlog) {
                console.log("El UID " + parseInt(data) + " no existe.");
                ;
            } else {
                console.log("El UID " + parseInt(data) + " existe.");
            }
        }
    });
/*
if(autorizados.indexOf(parseInt(data)) !== -1){
    console.log("Autorizado. Tu id es: " + data);
} else {
    console.log("No autorizado. Tu id es: " + data);    
}*/
});