const express = require('express');
const nodemailer = require("nodemailer");
let usuario;
const mailsend = (usuario, nombre, apellido) => {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    /*    let testAccount = await nodemailer.createTestAccount();*/

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'enos7@ethereal.email',
            pass: 'v6RJEQR4nuR2F8WQB2'
        }
    });

    // send mail with defined transport object
    let info = transporter.sendMail({
        from: '"Healthydev - Control de accesos." <healthydev2019@gmail.com>', // sender address
        to: "victormorenotin@gmail.com",  // list of receivers
        subject: "Se ha accedido a su oficina", // Subject line
        text: "Se ha accedido a la oficina mediante el control de accesos. El usuario que ha accedido es" + usuario + " Para más información consulte la interfaz web.", // plain text body
        html: 'Se ha accedido a la oficina mediante el control de accesos. <br>El usuario que ha accedido tiene el ID ' + usuario + ' <br>Corresponde a ' + nombre + ' ' + apellido + '.<br>Para más información consulte la <a href="healthydev.local">interfaz web</a>.' // html body
    });


    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
module.exports=mailsend;