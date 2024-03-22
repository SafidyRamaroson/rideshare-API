const { z, isValid } =  require("zod");

const validateInputRegister = (data)=>{

    const schema = z.object({
        firstName:z.string().maxLength(20),
        lastName:z.string().maxLength(50),
        email:z.string().isEmail(),
        password:z.string().minLength(8).maxLength(20),
    })
    return isValid(data,schema);
}

const validateInputLogin = (data)=>{
    const schema = z.object({
        email:z.string().isEmail(),
        password:z.string().minLength(8).maxLength(20),
    })
    return isValid(data,schema);
}


module.exports = {validateInputRegister,validateInputLogin};