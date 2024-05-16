const db = require("../../models");
const httpException = require("../../utils/handleError");


const handleCreateReservation = async() => {
    const { error: errorReservationData, success } = parseRequestData(req.body);
    if(!success){
       throw new  httpException(400,errorReservationData);
    }
    newReservation = await db.reservation.create({numberSeats,amountPaid,contact,userId,tripId});

    if(!newReservation){
        return newReservation
    }
    return null;
}

module.exports = handleCreateReservation;