const db = require("../../models");
const { default: httpException } = require("../../utils/httpException");


const getTripDetails = async(tripId)=>{

    if (!tripId || isNaN(Number(tripId))) {
        throw new httpException(400,TRIP_INVALID);
    }

    const tripDetailsData = await db.trip.findOne({
        where: { tripId },
        attributes: { exclude: ["driverId", "updatedAt"] }
    });
     
    if (!tripDetailsData) {
        console.log(`Trip with ${tripId} does not exist in the database`);
        throw new httpException(400,TRIP_NOT_FOUND);
    }

    return tripDetailsData;

}

module.exports = getTripDetails;