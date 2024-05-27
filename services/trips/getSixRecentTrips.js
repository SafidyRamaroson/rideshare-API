const { Sequelize } = require("sequelize");
const db = require("../../models");
const getFormattedTripWithStopData = require("./utils/getFormattedTripWithStopData");


const getSixRecentTrips = async()=> {
    
    const sixRecentTripsIncludeStop = await db.trip.findAll({
        attributes: { exclude: ["updatedAt"] },
        include: [{
            model: db.stop,
            required: false,
          }],
        order: [
            ['createdAt', 'DESC']
          ],
        limit:6,
        // logging:console.log
    });
    
    const formattedSixRecentTripsListWithStops = []
    for(const recentTripIncludeStop of sixRecentTripsIncludeStop){
        formattedSixRecentTripsListWithStops.push(await getFormattedTripWithStopData(recentTripIncludeStop))
    }
    
    return formattedSixRecentTripsListWithStops
}

module.exports = getSixRecentTrips