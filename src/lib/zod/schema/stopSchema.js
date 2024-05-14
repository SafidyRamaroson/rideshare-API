const { z } = require("zod");

const stopSchema = z.object({
    name:z
    .string({
        required_error:"stop name is required"
    })
    .trim()
    .min(1,"Stop name cannot be empty"),
    price:z
    .number({
        required_error: "Price of each is required"
    }).positive("Price of each Seat must be a positive number"),
});

module.exports = stopSchema;