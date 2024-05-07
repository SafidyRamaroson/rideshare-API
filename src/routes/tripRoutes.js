const express = require('express');
const tripRouter = express.Router();
const tripController = require("./../controllers/trip/index.controller");
const checkDisponibilitySeatsMiddleware = require("./../middlewares/checkDisponibilitySeats");

// fetch all trips created by a driver 
tripRouter.get("/driver",tripController.fetchAllTripDriver);

// create new trip
tripRouter.post("/create",tripController.createNewTrip);

// fetch trip details using tripId
tripRouter.get("/:tripId/details",tripController.fetchTripDetails);

// delete one trip
tripRouter.delete("/:tripId",tripController.deletedTrip);

// update trip
tripRouter.put("/:tripId",tripController.updateTrip);

// fetch all trip
tripRouter.get("/search",tripController.searchTrips);

// check disponibility of each Trip Created 
tripRouter.get("/:tripId/disponibilitySeats",checkDisponibilitySeatsMiddleware);

module.exports = tripRouter;