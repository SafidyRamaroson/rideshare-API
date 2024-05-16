const zodSchema = require("../../lib/zod/schema");
const db = require("../../models");
const { USER_ALREADY_EXIST } = require("../../utils/error.message");
const hashPassword = require("../../utils/hashPassword");
const parseRequestData = require("../../validation");


const createUser = async(userInfo)=>{
    const { email, password } = userInfo;
    const { error:errorUserInfo, success } = parseRequestData(userInfo,zodSchema.newUserSchema);
    if (!success){
        throw new Error(errorUserInfo[0].message);
    } 


    const existingUser  = await db.user.findOne(
        { 
            where: { 
                email 
            } 
        }
    );
    if (existingUser){
        throw new Error(USER_ALREADY_EXIST);
    } 

    const hashedPassword = await hashPassword(password);

    // if (req.body.unsubscribe) {
    //     await db.SpecialSubscriber.findOrCreate({ where: { email } });
    // }

    const user = await db.user.create({ ...userInfo,password: hashedPassword });
    return user;    
}

module.exports = createUser;


