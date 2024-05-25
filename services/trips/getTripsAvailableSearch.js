const { Op, Sequelize } = require("sequelize");
const db = require("../../models");
const getPagination = require("./../../utils/getPagination");
const getPagingData = require("./../../utils/getPagingData");
const getFormattedTripWithStopData = require("./utils/getFormattedTripWithStopData");


const getTripsAvailableSearch = async(page,size,searchCriteria)=> {

    const { 
        departurePrecise,
        destinationPrecise,
        dateOfDeparture:departureDate,
        returnOfDate:returnDate,
        passenger:seats
    } = searchCriteria;

    const { limit , offset } = getPagination(page, size);

    const whereConditions = {
        [Op.or]: [
            departurePrecise ? { departurePrecise: { [Op.like]: `%${departurePrecise}%` } } : {},
            destinationPrecise ? { destinationPrecise: { [Op.like]: `%${destinationPrecise}%` } } : {},
            departureDate ? { departureDate } : {},
            returnDate ? { returnDate } : { returnDate: { [Op.is]: null } },
            seats ? { seats: { [Op.gte]: seats } } : {}
        ]
    };
    
const data = await db.trip.findAndCountAll({
        where: whereConditions,
        offset:offset,
        limit:limit,
        attributes: {
            exclude: ["updatedAt"]
        },
        include: [{
            model:db.stop,
            where: {
               tripId:Sequelize.col("Trip.tripId")
            },
        }],
        logging: console.log
    });
    
    // Chercher le nombre de places disponibles pour chaque voyage (si nécessaire)
    const { tripsListData:tripsIncludeStopsListData,totalPages,totalItems } = getPagingData(data,page,limit);

    const formattedTripsListWithStops = []
    for(const tripIncldudeStopData of tripsIncludeStopsListData){
        formattedTripsListWithStops.push(await getFormattedTripWithStopData(tripIncldudeStopData))
    }

    return {
        trips:formattedTripsListWithStops,
        totalPages:totalPages,
        totalItems:totalItems,
    };
}

module.exports = getTripsAvailableSearch;