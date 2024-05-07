const { z } = require("zod");
const provinceList = require("../../../const/availableProvince");

const newTripSchema = z.object({
    departureProvince: z.enum(provinceList),
    departurePrecise: z.string({
        required_error: "Departure Precise is required"
    }).trim().min(2, "Departure Precise cannot be empty"),
    destinationProvince: z.enum(provinceList),
    destinationPrecise: z.string({
        required_error: "Destination Precise is required"
    }).trim().min(2, "Destination Precise cannot be empty"),
    dateOfDeparture: z.string({
        required_error: "Date of Departure is required"
    }),
    pricePerSeat: z.number({
        required_error: "Price Per Seat is required"
    }).positive("Price Per Seat must be a positive number"),
    additionalNotes: z.string({
        required_error: "Additional Notes is required"
    }).trim().min(1, "Additional Notes cannot be empty"),
    returnDatetime: z.string({
        required_error: "Return Datetime is required"
    }),
    refundable: z.boolean({
        invalid_type_error: "Refundable must be a boolean"
    }),
    oneWay: z.boolean({
        invalid_type_error: "One Way must be a boolean"
    }),
    status: z.enum(["available", "passed"])
});

module.exports = newTripSchema;
