
const { returnType, departureType } = require("../../const/typeStop");
const db = require("../../models/index");


const handleCreateTrip = async(req)=> {
    
    console.log("Trip Body");
    console.log(req.body);
    const { oneWay,departureStops,returnStops} = req.body;
    const { userId } = req.params;
    const { 
        departureProvince,
        departurePrecise,
        destinationProvince,
        destinationPrecise,
        departureDate,
        departureTime,
        isComfort,
        seats,
        departurePrice,
        fixedDeparturePrice,
        returnDate,
        returnTime,
        returnPrice,
        fixedReturnPrice,
        phoneNumber
     } = req.body;

    console.log(userId);
    
    const tripInfo = {
        departureProvince,
        departurePrecise,
        destinationProvince,
        destinationPrecise,
        departureDate,
        departureTime,
        isComfort,
        seats,
        departurePrice,
        fixedPriceDeparture:fixedDeparturePrice,
        returnDate,
        returnTime,
        returnPrice,
        fixedPriceReturn:fixedReturnPrice,
        phoneNumber,
        oneWay,
    }
    
    const userExists = await db.user.findByPk(userId);
    if (!userExists) {
        throw new Error("Invalid driverId, user does not exist");
    }

    const tripDataWithDriverId = {driverId:userId,...tripInfo};
    const tripCreated = await db.trip.create(tripDataWithDriverId);

    const tripId = await tripCreated.dataValues.tripId;
    

    const departureStopsInfoWithTripId = departureStops.map((departureStop)=> {
        if(departureStop.checked){
            return {
                location:departureStop.location,
                price:departureStop.price,
                tripId:tripId,
                typeDepartureOrReturn:departureType
            }
        }
    });

    const returnStopsInfoWithTripId = returnStops.map((returnStop)=> {
        if(returnStop.checked){
            return {
                location:returnStop.location,
                price:returnStop.price,
                tripId:tripId,
                typeDepartureOrReturn:returnType
            }
        }
    });

    await db.stop.bulkCreate(departureStopsInfoWithTripId);

    if(!oneWay){
        await db.stop.bulkCreate(returnStopsInfoWithTripId);
    }
}


module.exports = handleCreateTrip; 