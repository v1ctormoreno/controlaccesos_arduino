const app=require('./app');
const UID = require('./models/UID');
const path = require('path');
const nodemailer = require("nodemailer");
const mailsend=require('./mailer');
const Entrance=require('./models/Entrance');


const mongoose=require('mongoose');
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const port = new SerialPort('/dev/ttyACM0', { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: '\n' }));
const PORT=process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/control', {
       useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true  
}, (err,res)=>{
    if(err) throw err;
    else{
        console.log("Connection to BBDD works");
        app.listen(PORT, ()=>{
            console.log(`Web server running on port ${PORT}`);
            
        });
    }
});

parser.on('data', data => {
    console.log(data);
    uidlog = parseInt(data);
    UID.findOne({uid: uidlog}, (err, uidStored) => {
        if (err) {
            console.log(err);
        } else {
            if (!uidStored) {
                console.log("El UID " + parseInt(data) + " no existe.");
                port.write('0');
                mailsend(parseInt(data));
            } else {
                console.log("El UID " + uidStored.uid + " existe. Y se llama " + uidStored.name + ' ' + uidStored.lastname + ".");
                port.write('1');
                Entrance.create({uid: uidStored.uid});
                mailsend(parseInt(data), uidStored.name, uidStored.lastname);
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