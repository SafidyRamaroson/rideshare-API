const db = require("../../models");
const httpException = require("../../utils/handleError");

const handleCreateOneArchive = async(userId,tripId)=>{
    const foundUser = await db.user.findByPk(userId);

    if(!foundUser){
        throw new  httpException(400,USER_NOT_FOUND);
    }

    const foundTrip  = await db.trip.findByPk(tripId);

    if(!foundTrip){
        throw new httpException(400,TRIP_NOT_FOUND);
    }
    
    await db.archive.create({
        userId,
        tripId
    });

}

module.exports = handleCreateOneArchive;


