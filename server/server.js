const path = require('path');
const express = require('express');
const http = require('http');
const sockectIO = require('socket.io');

var port = process.env.PORT || 3000;
var publicPath = path.join(__dirname,'../public');
var app = express();
var server = http.createServer(app);
var io = sockectIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=> {

    console.log('new user is connected');

    socket.on('disconnect', () => {
        console.log(' a user is disconnected')
    })

    socket.emit('messageFromServer',{
        to:'all',
        message:"how can i help"
    })

    socket.on('messageFromClient', (message) => {
        console.log('im from the client', message)
    })
})



server.listen(port,() => {
    console.log(` app is listening on port ${port}`);
})