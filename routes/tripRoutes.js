const express = require('express');
const tripRouter = express.Router();
const fetchAllTripDriver = require('./../controllers/trip/fetchAllTripCreatedByDriver');

tripRouter.get("/driver",fetchAllTripDriver);

module.exports = tripRouter;