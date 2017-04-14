
var moment = require('moment');

var generateMessage = (from, text) => {

    return {
        from,
        text,
        timestamp: moment().valueOf() // is the same as new Date().getTime()
    }
}

var generateGeoPosURL = (from,lattitude, longitude) =>{
    return {
        from,
        url:`https://maps.google.com?q=${lattitude},${longitude}`,
        timestamp: moment().valueOf()
    }
}
module.exports = { generateMessage, generateGeoPosURL};