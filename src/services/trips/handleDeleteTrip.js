const db = require("../../models");
const { TRIP_NOT_FOUND } = require("../../utils/error.message");
const { default: httpException } = require("../../utils/httpException");

const handleDeleteTrip = async(tripId) => {

    const deletedTrip = await db.trip.destroy({
        where: {
            tripId
        }
    });

    if (!deletedTrip > 0){
        throw new httpException(404,TRIP_NOT_FOUND)
    }

}

module.exports = handleDeleteTrip;