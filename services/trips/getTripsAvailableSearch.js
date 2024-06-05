const { Op } = require("sequelize");
const db = require("../../models");
const getPagination = require("./../../utils/getPagination");
const getPagingData = require("./../../utils/getPagingData");
const getFormattedTripsListWithStops = require("./formattedTripsListWithStops");


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
              { departureDate: dateOfDeparture?.split("T")[0] ?? ""},
              { returnDate: returnOfDate?.split("T")[0] ?? ""}
            ]
          },
          { seats: { [Op.gte]: seats } }
        ]
      }

    const trips = await db.trip.findAndCountAll({
      limit,
      offset,
      attributes: {
            exclude: ["updatedAt"]
        },
        where: whereConditions,
    });

    const countTripsAvailble = await db.trip.count({
       attributes: {
            exclude: ["updatedAt"]
        },
        where: whereConditions,
    }) 

    // Chercher le nombre de places disponibles pour chaque voyage (si nécessaire)
    const { tripsListData } = getPagingData(trips,page,limit)
    const formattedTripsListWithStops = await  getFormattedTripsListWithStops(tripsListData)
    return {
        trips:formattedTripsListWithStops,
        totalPages:(Math.ceil(countTripsAvailble/size)== 0 && countTripsAvailble == 0) ? 0:Math.ceil(countTripsAvailble/size),
        totalItems:countTripsAvailble,
    }
}

module.exports = getTripsAvailableSearch;