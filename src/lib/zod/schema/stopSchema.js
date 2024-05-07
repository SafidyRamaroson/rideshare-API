const { z } = require("zod");

const stopSchema = z.object({
    name:z
    .string({
        required_error:"stop name is required"
    })
    .trim()
    .min(1,"Stop name cannot be empty"),
    dateTime:z
    .string({
        required_error:"Datetime is required"
    }),
    location:
    string({
        required_error:"Location of a stop is required"
    })
    .trim()
    .min(1,"Location stop cannot be empty")
});

module.exports = stopSchema;