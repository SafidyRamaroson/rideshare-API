const { z }=  require("zod");

const parseRegisterData = (data)=>{

    const schema = z.object({
        firstName:z.string().trim().max(20),
        lastName:z.string().trim().max(50),
        email:z.string().trim().email(),
        password:z.string().trim().min(8).max(20),
    })

    return schema.safeParse(data);
}

const parseLoginData = (data)=>{
    const schema = z.object({
        email:z.string().trim().email(),
        password:z.string().trim().min(8).max(20),
    })
    return schema.safeParse(data);
}


module.exports = { parseRegisterData,parseLoginData };