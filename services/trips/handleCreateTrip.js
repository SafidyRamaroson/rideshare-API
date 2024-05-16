const zodSchema = require("../../lib/zod/schema");
const db = require("../../models/index");
const parseRequestData = require("../../validation");
const httpException = require("../../utils/handleError");


const handleCreateTrip = async(userId,stops,tripData)=> {

    for(const stop of stops){
        const { success, error:errorStopData } = parseRequestData(stop,zodSchema.stopSchema);
        if(!success) throw new httpException(400,errorStopData);
    }

    const { error:errorTripData,success } = parseRequestData(tripData,zodSchema.newTripSchema);
    if(!success) throw new httpException(400,errorTripData);


    const foundUser = await db.user.findOne({where:{userId}});
    if(foundUser === null){
        throw new httpException(404,USER_NOT_FOUND);
    }

    const tripDataWithDriverId = {driverId:userId,...tripData};
    const tripCreated = await db.trip.create(tripDataWithDriverId);
        
    // get ID of Trip created
    const tripId = await tripCreated.dataValues.tripId;

    const stopsToCreateWithtripId = stops.map((stop)=> ({
        name:stop.name,
        price:stop.price,
        tripId:tripId
    }));
    await db.stop.bulkCreate(stopsToCreateWithtripId);
}


module.exports = handleCreateTrip; 