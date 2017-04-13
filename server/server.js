const path = require('path');
const express = require('express');
const http = require('http');
const sockectIO = require('socket.io');

var port = process.env.PORT || 3000;
var publicPath = path.join(__dirname,'../public');
var app = express();
var server = http.createServer(app);
var io = sockectIO(server);

var { generateMessage}  = require('./utils/messages');

app.use(express.static(publicPath));

io.on('connection', (socket)=> {

    console.log('new user is connected');

    socket.on('disconnect', () => {
        console.log(' a user is disconnected')
    })

    socket.emit('newMessage',generateMessage("admin","welcome"));
    socket.broadcast.emit('newMessage',generateMessage("admin","new user connected"));


    socket.on("createMessage", (message) => {

        io.emit("newMessage",generateMessage(message.from,message.text))

    })

    // socket.on('messageFromClient', (message) => {
    //     console.log('im from the client', message);
    //     io.emit('messageFromServer',{
    //         to:message.to,
    //         text:message.text
    //     })
    // })
})



server.listen(port,() => {
    console.log(` app is listening on port ${port}`);
})