const db = require("../../models");
const { TRIP_NOT_FOUND } = require("../../utils/error.message");
const httpException = require("../../utils/handleError");

const getReviewsList  = async(tripId)=> {
    const trip = await db.trip.findByPk(tripId);
    
    if(!trip){
        httpException(400,TRIP_NOT_FOUND);
    }

    const reviewsList = await db.reviews.findAll({
        where:{
            tripId:tripId
        }
    });
    return reviewsList;
}

module.exports = getReviewsList;