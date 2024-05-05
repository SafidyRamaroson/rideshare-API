const parseNewTrip = require("./parseNewTrip");
const parseSeatData = require("./parseSeatsData");
const parseStopsData = require("./parseStopsData");
const parseLoginData = require("./parseLoginData");
const parseRegisterData = require("./parseRegisterData");


module.exports = {
    parseRegisterData,
    parseLoginData,
    parseNewTrip,
    parseStopsData,
    parseSeatData
}