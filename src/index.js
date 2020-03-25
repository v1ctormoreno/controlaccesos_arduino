const app=require('./app');
const UID = require('./models/UID');
const path = require('path');
const nodemailer = require("nodemailer");



const mongoose=require('mongoose');
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const port = new SerialPort('/dev/ttyACM0', { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: '\n' }));
const PORT=process.env.PORT || 3000;

let acc = false;
/* mailer inicio */
function mailsend(usuario) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    /*    let testAccount = await nodemailer.createTestAccount();*/

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'healthydev2019@gmail.com',
            pass: 'Healthydev.1234'
        }
    });

    // send mail with defined transport object
        let info = transporter.sendMail({
            from: '"Healthydev - Control de accesos." <healthydev2019@gmail.com>', // sender address
            to: "victormorenotin@gmail.com, ivanlobatosanchez28@gmail.com",  // list of receivers
            subject: "Se ha accedido a su oficina", // Subject line
            text: "Se ha accedido a la oficina mediante el control de accesos. El usuario que ha accedido es" + usuario + " Para más información consulte la interfaz web.", // plain text body
            html: 'Se ha accedido a la oficina mediante el control de accesos. <br>El usuario que ha accedido tiene el ID ' + usuario + ' <br>Para más información consulte la <a href="healthydev.local">interfaz web</a>.' // html body
        });


    console.log("Email enviado.");
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
/* mailer fin*/

mongoose.connect('mongodb://localhost:27017/control', {
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
                console.log("El UID " + parseInt(data) + " existe.");
                port.write('1');
                mailsend(parseInt(data));
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