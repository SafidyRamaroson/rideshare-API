const db = require("./../../models/index");
const typeOf = require("./../../utils/common/typeOf");

const fetchTripDetails = async(req,res)=>{
    const { TripID } = req.params;
   
    // fetch trip details by ID 
    try {
        const tripDetailsData = await db.trip.findOne({
            where:{TripID},
            attributes: { exclude: ["DriverID","updatedAt"] }
        });
     
        if(tripDetails){    
            console.log(`Trip with ${TripID} don't exist in the database`);
            return res.status(404).json({
                message: "Trip not found"
            });
        }

        res.status(200).json({
            data:tripDetailsData
        });
    } catch (error) {
        console.log("Error:"+error);
        res.status(500).json({message:"Internal server error"});
    }
}

module.exports = fetchTripDetails; 