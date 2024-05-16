const getAllTrips = require("./getAllTrips");
const getAllTripsCreatedByDriver = require("./getAllTripsDriver");
const getTripsAvailableSearch = require("./getTripsAvailableSearch");
const handleCreateTrip = require("./handleCreateTrip");
const handleDeleteTrip = require("./handleDeleteTrip");


const tripsService = Object.freeze({
    getTripsAvailableSearch,
    handleCreateTrip,
    getAllTrips,
    getAllTripsCreatedByDriver,
    handleDeleteTrip,
    
});

module.exports = tripsService;