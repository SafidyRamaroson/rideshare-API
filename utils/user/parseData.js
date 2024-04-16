const { z }=  require("zod");

const parseRegisterData = (data)=>{

    const newUserSchema = z.object({
        firstName:z
           .string({
              required_error:"first Name is required"
            })
            .trim()
            .min(1,"First Name cannot be empty "),
        lastName:z.
            string({
                required_error:"last name is required"
            }).
            trim().
            min(1,"Last name cannot be empty"),
        dateOfBirth:z.string(),
        email:z.
            string({
                required_error:"Email is required"
            }).
            trim().
            min(1,"Email cannot be empty").
            email("Invalid email"),
        gender:z.enum(["Mr","Md",""], {
            errorMap:(issue,ctx)=>{
                return { message:"Invalid gender"}
            },
        }),
        password:z.string({
            required_error:"Password is required"
            })
            .trim()
            .min(8,"Password must contains at least 8 characters"),
        // unsubscribe:z.boolean("unsubscribe must be boolean"),
    });
  
    const requiredNewUserSchema = newUserSchema.required();

    return requiredNewUserSchema.safeParse(data);
}

const parseLoginData = (data)=>{
    const user = z.object({
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

    const requiredUser = user.required();
    return requiredUser.safeParse(data);
}


module.exports = { parseRegisterData,parseLoginData };