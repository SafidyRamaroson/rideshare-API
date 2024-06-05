const stopTypes = require("../../../const/typeStop");
const db = require("../../../models");
const getStopsByType = require("./getStopsByType");


const getFormattedTripWithStopData = async(tripIncldudeStopData) => {
    
    const { Stops,tripData } = tripIncldudeStopData
    const { driverId } = tripData
    
    const authorTrip = await db.user.findByPk(driverId,{attributes: {
        exclude: ["userId"]
    },});           

    const currentReturnStops  = getStopsByType(Stops,stopTypes.returnType)
    const currentDepartureStops = getStopsByType(Stops,stopTypes.departureType)

    const tripInfo = {
        author:authorTrip,
        tripId:tripData.tripId,
        departureTime:tripData.departureTime,
        departureProvince:tripData.departureProvince,
        departurePrecise:tripData.departurePrecise,
        destinationProvince:tripData.destinationProvince,
        destinationPrecise:tripData.destinationPrecise,
        departureTime:tripData.departureTime,
        departureDate:tripData.departureDate,
        isComfort:tripData.isComfort,
        seats:tripData.seats,
        returnDate:tripData.returnDate,
        returnTime:tripData.returnTime,
        oneWay:tripData.oneWay,
        fixedPriceDeparture:tripData.fixedPriceDeparture,
        fixedPriceReturn:tripData.fixedPriceReturn,
        departurePrice:tripData.departurePrice,
        returnPrice:tripData?.returnPrice,
        phoneNumber:tripData.phoneNumber,
        createdAt:tripData.createdAt,
    }

     return {
        ...tripInfo,
        departureStops:currentDepartureStops,
        returnStops:currentReturnStops,
    }
}

module.exports = getFormattedTripWithStopData;