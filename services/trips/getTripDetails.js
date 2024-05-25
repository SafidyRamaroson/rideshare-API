const { Sequelize } = require("sequelize");
const db = require("../../models");
const { TRIP_INVALID, TRIP_NOT_FOUND } = require("../../utils/error.message");
const getFormattedTripWithStopData = require("./utils/getFormattedTripWithStopData");


const getTripDetails = async(tripId)=>{

    if (!tripId || isNaN(Number(tripId))) {
        throw new Error(TRIP_INVALID)
    }

    const tripIncldudeStopData = await db.trip.findOne({
        where: { tripId },
        attributes: { exclude: ["updatedAt"] },
        include: [{
            model:db.stop,
            where: {
               tripId:Sequelize.col("Trip.tripId")
            },
        }],
    });

    if (!tripIncldudeStopData) {
        console.log(`Trip with ${tripId} does not exist in the database`);
        throw new Error(TRIP_NOT_FOUND)
    }

    const formattedTripIncludeStopData = getFormattedTripWithStopData(tripIncldudeStopData)
    
    return formattedTripIncludeStopData;
}



module.exports = getTripDetails;