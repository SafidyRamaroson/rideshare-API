const { z } = require("zod");
const provinceList = require("../../../const/availableProvince");

const newTripSchema = z.object({
    departureProvince: z.enum(provinceList),
    departurePrecise: z.string({
        required_error: "Departure Precise is required"
    }).trim().min(2, "Departure Precise cannot be empty"),
    destinationProvince: z.enum(provinceList),
    destinationPDerecise: z.string({
        required_error: "Destination Precise is required"
    }).trim().min(2, "{stination Precise cannot be empty"),
    departureTime: z.string({
        required_error: "Time of Departure is required"
    }),
    numberOfSeats:z.number({
        required_error: "Number of Seats is required"
    }).positive("Number of  must be a positive number"),
    pricePerSeat: z.number({
        required_error: "Price Per Seat is required"
    }).positive("Price Per Seat must be a positive number"),
    departureDate : z
    .string({
        required_error:"Departure date is required"
    }),
    // additionalNotes: z.string({ 
    //     required_error: "Additional Notes is required"
    // }).trim().min(1, "Additional Notes cannot be empty"),
    returnDatetime: z.string({
        required_error: "Return Datetime is required"
    }),
    refundable: z.boolean({
        invalid_type_error: "Refundable must be a boolean"
    }),
    oneWay: z.boolean({
        invalid_type_error: "One Way must be a boolean"
    }),
    status: z.enum(["available", "completed"])
});

module.exports = newTripSchema;
