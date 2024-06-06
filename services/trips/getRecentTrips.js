const db = require("../../models");
const getFormattedTripsListWithStops = require("./formattedTripsListWithStops");


const getRecentTrips = async(limit)=> {
    
    const sixRecentTrips = await db.trip.findAll({
        attributes: { exclude: ["updatedAt"] },
        // include: [{
        //     model: db.stop,
        //     required: false,
        //   }],
        order: [
            ['createdAt', 'DESC']
          ],
        limit
    });
    
    const formattedSixRecentTripsListWithStops = await getFormattedTripsListWithStops(sixRecentTrips)
    
    return formattedSixRecentTripsListWithStops
}

module.exports = getRecentTrips