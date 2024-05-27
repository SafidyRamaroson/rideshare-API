const { Op, Sequelize } = require("sequelize");
const db = require("../../models");
const getPagination = require("./../../utils/getPagination");
const getPagingData = require("./../../utils/getPagingData");
const getFormattedTripWithStopData = require("./utils/getFormattedTripWithStopData");


const getTripsAvailableSearch = async(page,size,req)=> {
    
    const { 
        departurePrecise,
        destinationPrecise,
        dateOfDeparture,
        returnOfDate,
        passenger:seats
    } = req.body;

    const { limit , offset } = getPagination(page, size);

    const whereConditions ={
        [Op.and]: [
          {
            [Op.or]: [
              { departurePrecise: { [Op.like]: `%${departurePrecise}%` } },
              { destinationPrecise: { [Op.like]:`%${destinationPrecise}%` } },
              { departureDate: dateOfDeparture?.split("T")[0]},
              { returnDate: returnOfDate?.split("T")[0]}
            ]
          },
          { seats: { [Op.gte]: seats } }
        ]
      }
      
      const data = await db.trip.findAndCountAll({
        offset: offset,
        limit: limit,
        attributes: {
          exclude: ["updatedAt"]
        },
        include: [{
            model: db.stop,
            required: false
        }],
        where: whereConditions,
      });

    const trips = await db.trip.findAll({
        attributes: {
            exclude: ["updatedAt"]
        }, 
        include: [{
            model: db.stop,
            required: false
        }],
        where: whereConditions,
    });

    const totalItems = trips.length;
    
    // Chercher le nombre de places disponibles pour chaque voyage (si nécessaire)
    const {tripsListData:tripsIncludeStopsListData } = getPagingData(data,page,limit);
 
    const formattedTripsListWithStops = []
    for(const tripIncldudeStopData of tripsIncludeStopsListData){
        formattedTripsListWithStops.push(await getFormattedTripWithStopData(tripIncldudeStopData))
    }

    return {
        trips:formattedTripsListWithStops,
        totalPages:(Math.ceil(totalItems/size)== 0 && totalItems == 0) ? 0:Math.ceil(totalItems/size),
        totalItems:totalItems,
    }
}

module.exports = getTripsAvailableSearch;