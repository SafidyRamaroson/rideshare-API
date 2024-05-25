const stopTypes = require("../../../const/typeStop");
const db = require("../../../models");
const getStopsByType = require("./getStopsByType");


const getFormattedTripWithStopData = async(tripIncldudeStopData) => {
    
    const { Stops,driverId } = tripIncldudeStopData
    const authorTrip = await db.user.findByPk(driverId,{attributes: {
        exclude: ["userId"]
    },});
    const currentReturnStops  = getStopsByType(Stops,stopTypes.returnType)
    const currentDepartureStops = getStopsByType(Stops,stopTypes.departureType)

    const tripInfo = {
        author:authorTrip,
        tripId:tripIncldudeStopData.tripId,
        departureTime:tripIncldudeStopData.departureTime,
        departureProvince:tripIncldudeStopData.departureProvince,
        departurePrecise:tripIncldudeStopData.departurePrecise,
        destinationProvince:tripIncldudeStopData.destinationProvince,
        destinationPrecise:tripIncldudeStopData.destinationPrecise,
        departureTime:tripIncldudeStopData.departureTime,
        departureDate:tripIncldudeStopData.departureDate,
        isComfort:tripIncldudeStopData.isComfort,
        seats:tripIncldudeStopData.seats,
        returnDate:tripIncldudeStopData.returnDate,
        returnTime:tripIncldudeStopData.returnTime,
        oneWay:tripIncldudeStopData.oneWay,
        fixedPriceDeparture:tripIncldudeStopData.fixedPriceDeparture,
        fixedPriceReturn:tripIncldudeStopData.fixedPriceReturn,
        departurePrice:tripIncldudeStopData.departurePrice,
        returnPrice:tripIncldudeStopData.returnPrice,
        phoneNumber:tripIncldudeStopData.phoneNumber,
        createdAt:tripIncldudeStopData.createdAt,
    }

     return {
        ...tripInfo,
        departureStops:currentDepartureStops,
        returnStops:currentReturnStops,
    }
}

module.exports = getFormattedTripWithStopData;