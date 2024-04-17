const db = require('./../../models/index');

const updateTrip = async(req,res)=>{
    const { TripID } = req.params;
    const { ...newValues } = req.body;
    try {
        // udpate Trip 
        const [updatedRowsCount]  = await db.trip.update(newValues,{
            where:{
                TripID
            }
        });

        // check if any rows were updated
        if(updatedRowsCount > 0){
            console.log(`Trip with id ${TripID} updated successfully.`);
            return res
            .status(200)
            .json({
                success:true,
                message:`Trip with id ${TripID} updated successfully.`
            });
        }else {
            console.log(`Trip with id ${TripID} not found.`);
            return res
            .status(404)
            .json({
                success:false,
                message:`Trip with id ${TripID} not found.`
            });
        }
    } catch (error) {
        console.log("Error"+error);
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}

module.exports = updateTrip;