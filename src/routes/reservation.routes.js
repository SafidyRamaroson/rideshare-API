const express = require("express");
const reservationRouter = express.Router();
const seatsMiddleware = require("../middlewares/seatsMiddleware");
const { createReservation } = require("../controllers/reservation.controller");


reservationRouter.post("/create/:tripId/:userId", seatsMiddleware,createReservation);


module.exports = reservationRouter;