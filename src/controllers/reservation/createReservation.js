const db = require("../../src/models/index");
const parseRequestData = require("./../../validation/index");

const createReservation = async(req,res)=>{
    
    const { userId, tripId } = req.params;
    const { numberSeats , amountPaid , contact } = req.body;
    const { error: errorReservationData, success } = parseRequestData(req.body);

    if(!success){
        return res.status(400).json({
            message:errorReservationData
        });
    }

    try {

        const reservation = await db.reservation.create({
            numberSeats,
            amountPaid,
            contact,
            userId,
            tripId
        });

        res.status(201).json({
            message:reservation
        })

    }catch(e){
        res.status(500).json({
            message:e.message
        })
    }

}

module.exports = createReservation;