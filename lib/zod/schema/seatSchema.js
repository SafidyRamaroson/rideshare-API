const { z } = require("zod");

const seatsSchema = z.object({
    seatType:z
    .enum(["Adult","Child","Handicap"]),
    numberOfSeats:z
    .number({
        invalid_type_error:"Number Of Seats must be a number type"
    })
});


module.exports = seatsSchema;