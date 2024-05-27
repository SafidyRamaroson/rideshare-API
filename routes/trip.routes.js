const express = require('express');
const tripRouter = express.Router();
// const tripController = require("./../controllers/trip/index.controller");
// const checkDisponibilitySeatsMiddleware = require("./../middlewares/checkDisponibilitySeats");
const { createTrip, fetchAllTripDriver, fetchTripDetails, deleteTrip, searchTrips, sixRecentTrips } = require('../controllers/trip.controller');
const updateTrip = require('../controllers/trip/udpateTrip');
const seatsMiddleware = require('../middlewares/seatsMiddleware');


// fetch all trips created by a driver 
tripRouter.get("/driver",fetchAllTripDriver);

// create new trip
tripRouter.post("/create/:userId",createTrip);

// fetch trip details using tripId
tripRouter.get("/:tripId/details",fetchTripDetails);

// delete one trip
tripRouter.delete("/:tripId",deleteTrip)

// update trip
tripRouter.put("/:tripId",updateTrip)

// fetch all trip
tripRouter.post("/search/:page",searchTrips)

// get six recents trips
tripRouter.get("/recents",sixRecentTrips)


module.exports = tripRouter;