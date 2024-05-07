const { z } = require("zod");

const reservationSchema = z.object({
    numberSeatsReserve: z
    .number({
        required_error:"Number of Seats is required"
    })
    .positive("Number of seats reserve must be a positive number"),
    amountPaid: z
    .number({
        required_error:"Amount Paid is required"
    })
    .positive("Amount Paid is required"),
    contact:z
    .string({
        required_error:"Contact Phone is required"
    })
});

module.exports = reservationSchema;

