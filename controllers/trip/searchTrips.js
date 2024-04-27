const db = require("../../models/index");

const searchTrips = async(req,res) => {
    
    const {
        departureProvince,
        destinationProvince,
        dateOfDeparture,
        returnDatetime,
    } = req.body;
    
    try {
        const optionsObjectQuery = returnDatetime ? req.body : { departureProvince, destinationProvince, dateOfDeparture }
        const tripsListData = await db.trip.findAll({
            where:optionsObjectQuery,
            attributes: {
                exclude: ["DriverID","updatedAt"] 
            }
        })
           
        res.status(200).json({
            data:tripsListData
        });
    } catch (error) {
        console.error("Error",error);
        res.status(500).json({
            message:error?.message
        });
        
    }
}

module.exports =  searchTrips; 