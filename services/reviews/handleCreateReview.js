const db = require("../../models");
const { USER_NOT_FOUND, TRIP_NOT_FOUND } = require("../../utils/error.message");
const httpException = require("../../utils/handleError");

const handleCreateOneReview = async(req)=>{
    const { tripId , userId } = req.params;
    const { content } = req.body;

    const user  = await db.user.findByPk(userId);

    if(!user){
        throw new  httpException(400,USER_NOT_FOUND);
    }

    const trip  = await db.trip.findByPk(tripId);
    
    if(!trip){
        throw new httpException(400,TRIP_NOT_FOUND);
    }


    await db.reviews({
        content,
        userId,
        tripId
    });

}

module.exports = handleCreateOneReview;

