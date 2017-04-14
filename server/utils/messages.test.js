
const expect = require('expect');
const { generateMessage, generateGeoPosURL } =require("./messages")


describe("test for the generate message function", () => {

    it("should return a valid message json object", () => {

        var from ="me";
        var text=" some message";

        var message = generateMessage(from,text);

        expect(message.timestamp).toBeA('number');
        expect(message).toInclude({from,text})
    })

})

describe("test for google maps url coordinates",() => {

    it("should return a valid google maps url", () =>{

        var from ="admin";
        var lattitude= 13;
        var longitude = 20;
        var url = `https://maps.google.com?q=${lattitude},${longitude}`;

        var generatedUrl = generateGeoPosURL(from,lattitude,longitude);

        expect(generatedUrl.timestamp).toBeA('number');
        expect(generatedUrl).toInclude({from,url});

    })
})