const db = require("../../models");
const getPagination = require("../../utils/getPagination");
const getPagingData = require("../../utils/getPagingData");


const getAllTrips = async(page, size) => {
    const { limit , offset }= getPagination(page,size);
        const data = await db.trip.findAndCountAll({
            where: {
                limit,
                offset
            },
            // exclude cols in table1 as trip here
            attributes : { exclude: ["driverId"] },
            include: [{
                model:db.user,
                where: {
                    driverId:Sequelize.col("userId")
                },
                attributes: {
                    exclude: ["userId"]
                }
            }]
        });

        return getPagingData(data,page,limit);
}

module.exports = getAllTrips;

