
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

var share_location = jQuery("#send-location");

share_location.on('click', function () {

    if(!navigator.geolocation){
        return alert("functionality not supportd by your borwser");
    }

    share_location.attr("disabled","disabled").text("Sharing location...");

    navigator.geolocation.getCurrentPosition(function (geolocation) {
        //console.log(geolocation);
        share_location.removeAttr("disabled").text("Share location");
        socket.emit('geolocationCoordinates',{
            from:"user ",
            latitude: geolocation.coords.latitude,
            longitude: geolocation.coords.longitude,

        })

    },function () {
        alert('An error is occured')
    })

    socket.on('geoPositionUrl',function (position) {
        //console.log(position.url)

        var li = jQuery("<li></li>");
        var link = jQuery("<a target='_blank'>My current location</a>");
        li.text(`${position.from} `);
        link.attr('href',position.url);
        li.append(link)

        jQuery('#messages').append(li);


    })
    
})


jQuery('#messages-form').on('submit',function (e) {
    e.preventDefault();
    socket.emit('createMessage',{from:'user',text:jQuery('[name=message]').val()},function (result) {
       jQuery("[name=message]").val("");
    })

})





