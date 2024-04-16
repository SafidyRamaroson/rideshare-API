const db = require("./../../models/index");
const typeOf = require("./../../utils/common/typeOf");

const fetchTripDetails = async(req,res)=>{
    const { TripID } = req.params;
    console.log(TripID);
    // fetch trip details by ID 
    try {
        const tripDetails = await db.trip.findOne({
            where:{TripID},
            attributes: { exclude: ["DriverID","updatedAt"] }
        });
     
        if(tripDetails === null){    
            console.log(`Trip with ${TripID} don't exist in database`);
            return res.status(404).json({
                message: "Trip not found"
            })
        }

        res.status(200).json({
            data:tripDetails
        });
    } catch (error) {
        console.log("Error:"+error);
        console.log("true")
        res.status(500).json({message:"Internal server error"});
    }
}

module.exports = fetchTripDetails; 