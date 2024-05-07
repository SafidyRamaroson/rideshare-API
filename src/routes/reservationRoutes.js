const express = require("express");
const reservationRouter = express.Router();
const reservationController = require("./../controllers/reservation/index.controller");
const seatsMiddleware = require("./../middlewares/seatsMiddleware");

reservationRouter.post("/create/:tripId/:userId", seatsMiddleware,reservationController.createReservation);


module.exports = reservationRouter;