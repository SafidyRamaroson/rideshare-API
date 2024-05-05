const { z } = require("zod");

const loginSchema = z.object({
    email:z
    .string({
        required_error:"Email is required"
    })
    .trim()
    .min(1,"Email cannot be empty")
    .email("Invalid email"),
   password:z
    .string({
        required_error:"Password is required"
    })
    .trim()
    .min(8,"Password must contains at least 8 characters"),
});


module.exports = loginSchema;
