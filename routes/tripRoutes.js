const express = require('express');
const tripRouter = express.Router();
const tripController = require("./../controllers/trip/index.controller");

tripRouter.get("/driver",tripController.fetchAllTripDriver);
tripRouter.post("/createOne",tripController.createNewTrip);

module.exports = tripRouter;