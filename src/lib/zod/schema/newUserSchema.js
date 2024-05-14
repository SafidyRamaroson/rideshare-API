const { z } = require("zod");

const newUserSchema = z.object({
    firstName:z
       .string({
          required_error:"First Name is required"
        })
        .trim()
        .min(1,"First Name cannot be empty "),
    lastName:z.
        string({
            required_error:"Last name is required"
        }).
        trim()
        .min(1,"Last name cannot be empty"),
    dateOfBirth:z.string(),
    email:z.
        string({
            required_error:"Email is required"
        }).
        trim().
        min(1,"Email cannot be empty").
        email("Invalid email"),
    gender:z.enum(["Mr","Md","not-specifie"], {
        errorMap:(issue,ctx)=>{
            return { message:"Invalid gender"}
        },
    }),
    password:z.string({
        required_error:"Password is required"
        })
        .trim()
        .min(8,"Password must contains at least 8 characters"),
});

module.exports = newUserSchema;