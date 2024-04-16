const db = require("./../../models/index");


const deleteTrip = async(req,res)=>{
    const { TripID } = req.params;
    
    try {

        const deletedTrip = await db.trip.destroy({
            where:{
                TripID
            }
        });

        if(!deletedTrip){
            return res.status(400).json({
                message:`Trip with id ${TripID} don't exist in database`
            });
        }
        
        res.status(204)
    } catch (error) {
        console.log("Error:"+error);
        res.status(500).json({
            message:error
        });
    }
}

module.exports = deleteTrip;