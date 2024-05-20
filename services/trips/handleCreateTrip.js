const { returnType, departureType } = require("../../const/typeStop");
const db = require("../../models/index");


const handleCreateTrip = async(req)=> {
    
    const { trips:tripInfo,departureStops:departureStopsInfo,departureReturn:returnStopsInfo } = req.body;
    const { userId } = req.params;
    const { oneWay } = tripInfo;
    

    const tripDataWithDriverId = {driverId:userId,...tripInfo};
    const tripCreated = await db.trip.create(tripDataWithDriverId);

    // get ID of Trip created
    const tripId = await tripCreated.dataValues.tripId;

    const departureStopsInfoWithTripId = departureStopsInfo.map((departureStop)=> ({
        location:departureStop.location,
        price:departureStop.price,
        tripId:tripId,
        type:departureType
    }));

    const returnStopsInfoWithTripId = returnStopsInfo.map((returnStop)=> ({
        location:returnStop.location,
        price:returnStop.price,
        tripId:tripId,
        type:returnType
    }));

    await db.stop.bulkCreate(departureStopsInfoWithTripId);

    if(!oneWay){
        await db.stop.bulkCreate(returnStopsInfoWithTripId);
    }
}



module.exports = handleCreateTrip; 