const db = require("./../../models/index");
const  { Sequelize } = require("sequelize");

const fetchAllTripDriver = async(req,res)=>{
    const { email } = req.body;

    // check if user exist in database 
    const user = await db.user.findOne({where:{email}});

    if(!user){
        console.log("user don't have an account");
        return res.status(404).json({
            message:`Bad Request ,user with email ${email} don't have an account`
        });
    }
    
    // get  list trips created by this driver with email in database
    // join the intersection between the table user and the table trip
    try {
        const trips = await db.trip.findAll({
            // exclude cols in table1 as trip here
            attributes : { exclude: ["DriverID"] },
            include: [{
                model:db.user,
                where: {
                    DriverID:Sequelize.col("UserID")
                },
                // exclude all cols in user
                attributes: [] 
            }]
        });

        res.status(200).json({
            message:"List of Trips created by Driver ID",
            data: trips
        })
    }catch(error){
        console.error('Error:', error);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
}


module.exports = fetchAllTripDriver;

