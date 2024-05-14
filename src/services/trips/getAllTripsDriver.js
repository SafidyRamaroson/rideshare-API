const db = require("../../models");
const { USER_NOT_FOUND } = require("../../utils/error.message");
const { default: httpException } = require("../../utils/httpException");


const getAllTripsCreatedByDriver = async(driverId) => {
        // check if user exist in database 
        const user = await db.user.findOne({where:{userId:driverId}});

        if(!user){
            console.log("user don't have an account");
            throw new httpException(400,USER_NOT_FOUND)
        }
        
        // get  list trips created by this driver with email in database
        // join the intersection between the table user and the table trip

        const trips = await db.trip.findAll({
            // exclude cols in table1 as trip here
            attributes : { exclude: ["driverId"] },
            include: [{
                model:db.user,
                where: {
                    driverId:Sequelize.col("userId")
                },
                    // exclude all cols in user
                attributes: [] 
            }]
        });

        return trips;
}

module.exports = getAllTripsCreatedByDriver;


