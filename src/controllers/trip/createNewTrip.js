const db = require("../../src/models/index");
const zodObjectSchema = require("../../lib/zod/schema/index");
const parseRequestData = require('../../validation/index');

// we limit the covoit inside of Madagascar but feature 
// we consider the entiry world 
// controller that handle the incomming request and response to the client
const createTrip = async(req,res) => {
    const { userId } = req.params;
    const { stops,...tripData } = req.body;


    for(const stop of stops){
        const { success, error:errorStopData } = parseRequestData(stop,zodObjectSchema.stopSchema);
        if(!success) return res.status(400).json({error:errorStopData});
    }

    const { error:errorTripData,success } = parseRequestData(tripData,zodObjectSchema.newTripSchema);
    if(!success) return res.status(400).json({error:errorTripData});

    try {
        const foundUser = await db.user.findOne({where:{userId}});
        if(foundUser === null){
            console.log("User not found");
            return res.status(404).json({message:"User not found"});
        }

        const tripDataWithDriverId = {driverId:userId,...tripData};
        const tripCreated = await db.trip.create(tripDataWithDriverId);
        
        // get ID of Trip created
        const tripId = await tripCreated.dataValues.tripId;

        const stopsToCreateWithtripId = stops.map((stop)=> ({
            name:stop.name,
            dateTime:stop.dateTime,
            location:stop.location,
            tripId:tripId
        }));
        await db.stop.bulkCreate(stopsToCreateWithtripId);
        res.status(201).json({
            message:"New trip created successfully"
        }); 
        
    } catch (error) {
        console.error("Error :"+error);
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}

module.exports = createTrip;