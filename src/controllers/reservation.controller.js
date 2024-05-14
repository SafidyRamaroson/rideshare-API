const { handleCreateReservation } = require("../services/TripReservation/TripReservation.service");


// Create reservation
const createReservation = async(req,res, next) =>{
    try {
        newReservation = await handleCreateReservation(req?.params,req?.body);
        res.status(201).send(newReservation);
    } catch (error) {
        console.log(error.message);
        next(error);
    }
}

module.exports = { createReservation }