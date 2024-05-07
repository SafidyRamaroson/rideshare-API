const db = require("../models/index");

const seatsMiddleware = async(req,res,next) => {
    const { tripId } = req.params.tripId;
    const { numberOfSeats } = req.body;
    const trip = await db.trip.findByPk(tripId);

    if(!trip){
        throw new Error("Trip not found");
    }

    if(trip.numberOfSeats >= numberOfSeats){
        next();
    }else {
        throw new Error("Not enough seats available");
    }

}

module.exports = seatsMiddleware;