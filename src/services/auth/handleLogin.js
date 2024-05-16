const zodSchema = require("../../lib/zod/schema");
const db = require("../../models");
const { USER_NOT_FOUND, INCORRECT_PASSWORD } = require("../../utils/error.message");
const generateToken = require("../../utils/generateToken");
const parseRequestData = require("../../validation");
const bcrypt = require("bcryptjs");



const handleLogin = async(req,res)=>{
    
    const {error:errorInputData,success } = parseRequestData(req?.body,zodSchema.loginSchema);

        if(!success) throw new Error(errorInputData[0].message);
    
        const { email,password }= req?.body;

        const foundUser = await db.user.findOne({where:{email}});
        
        if(!foundUser) throw new Error(USER_NOT_FOUND);
        
        const isMatch = await bcrypt.compare(password, foundUser.password);
        
        if(!isMatch){
            throw new Error(INCORRECT_PASSWORD)
        }else{  
            const token =  generateToken(foundUser);
            res.status(200).send(token);
        }
}

module.exports = handleLogin;
