var generateMessage = (from, text) => {

    return {
        from,
        text,
        timestamp: new Date().getTime()
    }
}

var generateGeoPosURL = (from,lattitude, longitude) =>{
    return {
        from,
        url:`https://maps.google.com?q=${lattitude},${longitude}`,
        timestamp: new Date().getTime()
    }
}
module.exports = { generateMessage, generateGeoPosURL};