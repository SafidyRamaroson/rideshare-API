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
    })
});

module.exports = stopSchema;