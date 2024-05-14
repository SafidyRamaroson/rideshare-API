const { Op } = require("sequelize");
const db = require("../../models");
const getPagination = require("./../../utils/getPagination");
const getPagingData = require("./../../utils/getPagingData");

const getTripsAvailableSearch = async(page,size,inputCriteria)=> {

    const { 
        departureProvince,
        destinationProvince,
        departureTime,
        returnDatetime,
        numbersOfSeats 
    } = inputCriteria;
    
    
    const { limit , offset } = getPagination(page, size);
    
    const data = await db.trip.findAndCountAll({
        where:{
            [Op.or]: [
                {
                    departureProvince
                },
                {
                    destinationProvince
                },
                {
                    departureTime
                },
                {
                    returnDatetime
                },
                {
                    numbersOfSeats
                },
            ],
            limit,
            offset,
        } ,
        attributes: {
            exclude: ["driverId", "updatedAt"]
        }
    });

    // Chercher le nombre de places disponibles pour chaque voyage (si nécessaire)
    const tripsListData = getPagingData(data,page,limit);

    return tripsListData;
}

module.exports = getTripsAvailableSearch;