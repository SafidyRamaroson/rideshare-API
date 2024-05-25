const { Op, Sequelize } = require("sequelize");
const db = require("../../models");
const getPagination = require("./../../utils/getPagination");
const getPagingData = require("./../../utils/getPagingData");
const stopTypes = require("../../const/typeStop");



const getTripsAvailableSearch = async(page,size,searchCriteria)=> {

    const { 
        departurePrecise,
        destinationPrecise,
        dateOfDeparture:departureDate,
        returnOfDate:returnDate,
        passenger:seats
    } = searchCriteria;
    
    console.log("search criteria")
    console.log(searchCriteria);
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
    
    console.log("Data")
    console.log(data)

    // Chercher le nombre de places disponibles pour chaque voyage (si nécessaire)
    const { tripsListData:tripsListDataWithStops,totalPages,totalItems } = getPagingData(data,page,limit);

    
    const formattedTripsListWithStops = []


    for(const tripDataWithStop of tripsListDataWithStops){
        const { Stops,driverId } = tripDataWithStop
        const authorTrip = await db.user.findByPk(driverId,{attributes: {
            exclude: ["userId"]
        },});
        const currentReturnStops  = getStopsByType(Stops,stopTypes.returnType)
        const currentDepartureStops = getStopsByType(Stops,stopTypes.departureType)

        const tripInfo = {
            author:authorTrip,
            tripId:tripDataWithStop.tripId,
            departureTime:tripDataWithStop.departureTime,
            departureProvince:tripDataWithStop.departureProvince,
            departurePrecise:tripDataWithStop.departurePrecise,
            destinationProvince:tripDataWithStop.destinationProvince,
            destinationPrecise:tripDataWithStop.destinationPrecise,
            departureTime:tripDataWithStop.departureTime,
            departureDate:tripDataWithStop.departureDate,
            isComfort:tripDataWithStop.isComfort,
            seats:tripDataWithStop.seats,
            returnDate:tripDataWithStop.returnDate,
            returnTime:tripDataWithStop.returnTime,
            oneWay:tripDataWithStop.oneWay,
            fixedPriceDeparture:tripDataWithStop.fixedPriceDeparture,
            fixedPriceReturn:tripDataWithStop.fixedPriceReturn,
            departurePrice:tripDataWithStop.departurePrice,
            returnPrice:tripDataWithStop.returnPrice,
            phoneNumber:tripDataWithStop.phoneNumber,
            createdAt:tripDataWithStop.createdAt,
        }

        formattedTripsListWithStops.push({
            ...tripInfo,
            departureStops:currentDepartureStops,
            returnStops:currentReturnStops,
        })
      
    }

    return {
        trips:data,
        totalPages:totalPages,
        totalItems:totalItems,
    };
}

const getStopsByType = (stops,type) => {

    const stopsByType = []
    for(const stop of stops){
        if(stop.dataValues.typeDepartureOrReturn === type){
            stopsByType.push({
                location:stop.location,
                price:stop.price,
                stopId:stop.stopId,
            })
        }
    }
    return stopsByType
}

module.exports = getTripsAvailableSearch;