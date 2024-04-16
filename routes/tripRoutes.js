const express = require('express');
const tripRouter = express.Router();
const tripController = require("./../controllers/trip/index.controller");

// fetch all trips created by a driver 
tripRouter.get("/driver",tripController.fetchAllTripDriver);

// create new trip
tripRouter.post("/createOne",tripController.createNewTrip);

// fetch trip details using tripID
tripRouter.get("/:TripID/details",tripController.fetchTripDetails);

// delete one trip
tripRouter.delete("/:TripID",tripController.deletedTrip);

module.exports = tripRouter;