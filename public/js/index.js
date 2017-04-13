
var socket = io();

socket.on('connect', () => {
    console.log('connected to server');

    socket.emit('messageFromClient', {
        to:'all',
        text: 'hello for all '
    })


})

socket.on('disconnect', () => {
    console.log('connection lost')
})

socket.on('messageFromServer', function (message) {

    console.log("message from the server: ", message)

})

