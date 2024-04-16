// THIS  CONTROLLER MANAGER THE  CREATION OF NEW PUBLICATION
// CONCERNING THE CREATION OF AN EVENT, DELETE EVENT,
// DELETE ALL EVENT CREATED  BY DRVIER ID, UPDATE AN EVENT, 
// GET ALL TRIPS BY DRIVER ID
// SEARCH AN EVENT BY
// DEPARTURELOCATION or
// DESTINATION or
// DEPARTURE TIME or
// PRICEPERPESSENGER

const fetchAllTripDriver = require("./fetchAllTripCreatedByDriver");
const createNewTrip = require("./createNewTrip");
const fetchTripDetails = require("./fetchTripDetails");
const deletedTrip = require('./deleteTrip');

const tripController = Object.freeze({
    fetchAllTripDriver,
    createNewTrip,
    fetchTripDetails,
    deletedTrip,
});

module.exports = tripController;