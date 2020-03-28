const express = require('express');
const nodemailer = require("nodemailer");
const mailsend = (usuario, nombre, apellido) => {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    /*    let testAccount = await nodemailer.createTestAccount();*/

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: 'healthydev2019@gmail.com',
            pass: 'Healthydev.1234'
        }
    });
    let maillist = [
        'victormorenotin@gmail.com',
        'healthydev2019@gmail.com'
    ];

    // send mail with defined transport object
    let info = transporter.sendMail({
        from: '"Healthydev - Control de accesos." <healthydev2019@gmail.com>', // sender address
        to: maillist, // list of receivers
        subject: "Sistema de control de accesos", // Subject line
        text: "Se ha accedido a la oficina mediante el control de accesos. Este email es en texto plano, por lo que no podemos enviar la información correctamente. Puede ver este email en HTML o entrar a la web de su control de acceso para obtener más información. Cualquier duda tiene a su disposición nuestra línea de soporte.", // plain text body
        html: 'Healthydev informa, <br> Se ha accedido a la oficina mediante el control de accesos. <br>Datos del acceso:<br>Nombre y apellidos: ' + nombre + ' ' + apellido + ' <br> ' + 'ID de usuario: ' + usuario + ' <br>Para más información consulte la <a href="healthydev.local">interfaz web</a>.' // html body
    });


    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
module.exports = mailsend;