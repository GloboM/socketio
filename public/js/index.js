
var socket = io();

socket.on('connect', () => {
    console.log('connected to server');




})

socket.on('disconnect', () => {
    console.log('connection lost')
})

socket.on('newMessage', function (message) {

    var li = jQuery("<li></li>");
    li.text(message.from+" : "+ message.text);
    jQuery("#messages").append(li);


})




jQuery('#chat-form').on('submit',function (e) {
    e.preventDefault();
    socket.emit('createMessage',{from:'user',text:jQuery('[name=msg]').val()},function (result) {
        console.log('received? ',result);
    })

})





