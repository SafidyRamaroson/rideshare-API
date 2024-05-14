const db = require("../models/index");
const { TRIP_NOT_FOUND } = require("../utils/error.message");
const httpException = require("../utils/httpException");


const seatsMiddleware = async(req,res,next) => {
    const { tripId } = req.params.tripId;
    const { numberOfSeats } = req.body;
    const trip = await db.trip.findByPk(tripId);

    if(!trip){
        throw new httpException(404,TRIP_NOT_FOUND);
    }

    if(trip.numberOfSeats >= numberOfSeats){
        next();
    }else {
        throw new Error("Not enough seats available");
    }

}

module.exports = seatsMiddleware;