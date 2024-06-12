const db = require("../../models");
const { TRIP_INVALID, TRIP_NOT_FOUND } = require("../../utils/error.message");
const getFormattedTripsListWithStops = require("./formattedTripsListWithStops");


const getTripDetails = async(tripId)=>{

    if (!tripId || isNaN(Number(tripId))) {
        throw new Error(TRIP_INVALID)
    }

    const tripIncldudeStopData = await db.trip.findOne({
        where: { tripId },
        attributes: { exclude: ["updatedAt"] },
        include: [{
            model: db.stop,
            required: false, 
        }],
    });

    if (!tripIncldudeStopData) {
        throw new Error(TRIP_NOT_FOUND)
    }


    const formattedTripIncludeStopData = getFormattedTripsListWithStops([tripIncldudeStopData])
    
    return formattedTripIncludeStopData;
}



module.exports = getTripDetails;