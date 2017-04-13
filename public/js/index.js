
var socket = io();

socket.on('connect', () => {
    console.log('connected to server');




})

socket.on('disconnect', () => {
    console.log('connection lost')
})

socket.on('newMessage', function (message) {

    console.log("message from "+message.from +' : '+message.text);

})




