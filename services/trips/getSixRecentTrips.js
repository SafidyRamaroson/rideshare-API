const db = require("../../models");
const getFormattedTripsListWithStops = require("./formattedTripsListWithStops");


const getSixRecentTrips = async()=> {
    
    const sixRecentTrips = await db.trip.findAll({
        attributes: { exclude: ["updatedAt"] },
        // include: [{
        //     model: db.stop,
        //     required: false,
        //   }],
        order: [
            ['createdAt', 'DESC']
          ],
        limit:6,
    });
    
    const formattedSixRecentTripsListWithStops = await getFormattedTripsListWithStops(sixRecentTrips)
    
    return formattedSixRecentTripsListWithStops
}

module.exports = getSixRecentTrips