const db = require("../../models");

const getAssociatedStopOfTripId = async(tripId) => {
    const associatedStop =  await db.stop.findAll({
        where:{
          tripId:tripId
        }
      })
    
    return associatedStop
}

module.exports = getAssociatedStopOfTripId