const db = require("./../models/index");

const checkDisponibiltySeats = async(req,res) => {
    const { tripID } = req.params.tripID;
    
    try {
        const seatsJson = await db.trip.findOne({
            where:{
                TripID: tripID
            }
        });

        const seatsData  = await seatsJson.JSON();

        console.log(seatsData);
    } catch (error) {
        console.log("Error",error);
        res
        .status(500)
        .json({
            message:"Internal Server Error"
        });
    }
}

module.exports = checkDisponibiltySeats;