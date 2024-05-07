const db = require("../../models/index");

// verify user existance 
// verify trip existance 
const savePostTrip = async(req, res) => {
    
    const { userId , tripId } = req.params;
    
    try {
        const foundUser = await db.user.findByPk(userId);

        if(!foundUser){
            return res.status(400).json({
                message:"User not found"
            });
        }
    
        const foundTrip  = await db.trip.findByPk(tripId);
        
        if(!foundTrip){
            return res.status(400).json({
                message:"Trip not found"
            });
        }

        const savedPost  = await db.save.create({
            userId,
            tripId
        });

        res.status(201).json({
            message:savedPost
        });
    } catch (e) {
        console.log("Error :",e);
        res.status(500).json({
            message:e.message
        })
    }
}

module.exports = savePostTrip;
