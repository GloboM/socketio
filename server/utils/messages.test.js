
const expect = require('expect');
const { generateMessage } =require("./messages")


describe("test for the generate message function", () => {

    it("should return a valid message json object", () => {

        var from ="me";
        var text=" some message";

        var message = generateMessage(from,text);

        expect(message.timestamp).toBeA('number');
        expect(message).toInclude({from,text})
    })
})