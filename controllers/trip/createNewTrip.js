const db = require("./../../models/index");
const parseNewTripData = require("../../validations/parseNewTrip");
const parseStopsData = require("../../validations/parseStopsData");
const parseSeatData = require("../../validations/parseSeatsData");

// we limit the covoit inside of Madagascar but feature 
// we consider the entiry world 

// controller that handle the incomming request and response to the client
const createTrip = async(req,res) => {
    const { UserID } = req.params;
    const { stops,seats,...tripData } = req.body;


    for(const stop of stops){
        const { success, error:errorStopData } = parseStopsData(stop);
        if(!success) return res.status(400).json({error:errorStopData});
    }

    for(const seat of seats){
        const { success, error:errorSeatData } = parseSeatData(seat);
        if(!success) return res.status(400).json({error:errorSeatData});
    }

    const { error:errorTripData,success } = parseNewTripData(tripData);
    if(!success) return res.status(400).json({error:errorTripData});


    // retrieve the DriverID by email 
    // Il suffit d'utilser cookie or create header content 
    // i.e à chaque requete , on a toujours le header ou une cookie qui 
    // contient les informations sur le personne connecté 
    try {
        const foundUser = await db.user.findOne({where:{UserID}});
        if(foundUser === null){
            console.log("User not found");
            return res.status(404).json({message:"User not found"});
        }

        
        const tripDataWithDriverID = {DriverID:UserID,...tripData};
        const tripCreated = await db.trip.create(tripDataWithDriverID);
        
        // get ID of Trip created
        const tripID = await tripCreated.dataValues.TripID;

        const stopsToCreateWithTripID = stops.map((stop)=> ({
            name:stop.name,
            dateTime:stop.dateTime,
            location:stop.location,
            TripID:tripID
        }));

        const seatsToCreateWithTripID = seats.map((seat)=> ({
            seatType:seat.seatType,
            numberOfSeats:seat.numberOfSeats,
            TripID:tripID
        }));
        
        try {
            await db.stop.bulkCreate(stopsToCreateWithTripID);
            await db.seat.bulkCreate(seatsToCreateWithTripID);
        } catch (error) {
            throw new Error(error);
        }

        res.status(201).json({
            message:"New trip created successfully"
        }); 
        
    } catch (error) {
        console.error("Error:"+error);
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}


module.exports = createTrip;