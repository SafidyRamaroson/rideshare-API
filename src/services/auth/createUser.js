const zodSchema = require("../../lib/zod/schema");
const db = require("../../models");
const { USER_ALREADY_EXIST } = require("../../utils/error.message");
const hashPassword = require("../../utils/hashPassword");
const httpException = require("../../utils/httpException").default;
const parseRequestData = require("../../validation");


const createUser = async(userInfo)=>{
    const { email, password } = userInfo;
    const { error:errorUserInfo, success } = parseRequestData(userInfo,zodSchema.newUserSchema);
    if (!success) throw new httpException(400,errorUserInfo);

    const foundUser = await db.user.findOne(
        { 
            where: { 
                email 
            } 
        }
    );
    if (!foundUser) return httpException(400,USER_ALREADY_EXIST);

    const hashedPassword = await hashPassword(password);

    // if (req.body.unsubscribe) {
    //     await db.SpecialSubscriber.findOrCreate({ where: { email } });
    // }

    const user = await db.user.create({ ...userInfo,password: hashedPassword });

    return user;
}

module.exports = createUser;

