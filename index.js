const http = require('http');
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const port = new SerialPort('COM7', { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: '\n' }));

var autorizados = [15683, 214];
//create a server object:
http.createServer(function (req, res) {
    res.write(''); //write a response to the client
    res.end(''); //end the response
}).listen(8080); //the server object listens on port 8080
// Read the port data
port.on("open", () => {
    console.log('Serial Open');
});
parser.on('data', data => {
if(autorizados.indexOf(parseInt(data)) !== -1){
    console.log("Autorizado. Tu id es: " + data);
} else {
    console.log("No autorizado. Tu id es: " + data);    
}
});