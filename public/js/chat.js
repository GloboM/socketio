
var socket = io();


function scrollToBottom() {

    // selectors

    var messages = jQuery("#messages");
    var lastmessage = messages.children("li:last-child");


    // height
    var scrollHeight  = messages.prop("scrollHeight");
    var clientHeight = messages.prop("clientHeight");
    var scrollTop = messages.prop("scrollTop");
    var lastMessageHeight = lastmessage.innerHeight();
    var beforeLastMessage = lastmessage.prev().innerHeight();

    if(clientHeight+scrollTop+lastMessageHeight+ beforeLastMessage >= scrollHeight){

        messages.scrollTop(scrollHeight);
    }

}

socket.on('connect', () => {
    console.log('connected to server');




})

socket.on('disconnect', () => {
    console.log('connection lost')
})

socket.on('newMessage', function (message) {

    var message_template = jQuery("#message_template").html();
    var message_html = Mustache.render(message_template, {
        from: message.from,
        text:message.text,
        createdAt: moment(message.timestamp).format("hh:mm a")

    });
    jQuery('#messages').append(message_html);
    scrollToBottom();

    // var li = jQuery("<li></li>");
    // li.text(message.from+" : "+moment(message.timestamp).format("hh:mm a")+ " :"+ message.text);
    // jQuery("#messages").append(li);


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
        alert('An error is occured');
        share_location.removeAttr("disabled").text("Share location");
    })

    socket.on('geoPositionUrl',function (position) {
        //console.log(position.url)

        var position_template = jQuery('#position_template').html();
        var position_html = Mustache.render(position_template,{
            from: position.from,
            url: position.url,
            createdAt: moment(position.timestamp).format("hh:mm a")
        })

        jQuery("#messages").append(position_html);
        scrollToBottom();


        // var li = jQuery("<li></li>");
        // var link = jQuery("<a target='_blank'>My current location</a>");
        // li.text(`${position.from} : ${moment(position.timestamp).format("hh:mm a")} `);
        // link.attr('href',position.url);
        // li.append(link)
        //
        // jQuery('#messages').append(li);


    })
    
})


jQuery('#messages-form').on('submit',function (e) {
    e.preventDefault();
    socket.emit('createMessage',{from:'user',text:jQuery('[name=message]').val()},function (result) {
       jQuery("[name=message]").val("");
    })

})





