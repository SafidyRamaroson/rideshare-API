const hashPassword = require("../../utils/hashPassword");
const db = require("../../models/index");
const { USER_NOT_FOUND, USER_PROFIL_UPDATED } = require("../../utils/error.message");
const httpException = require("../../utils/httpException").default;


const udpateUserProfile = async(userId,password,newProfile)=> {
    const user = await db.user.findOne({where:{userId}});
        if(!user) throw new httpException(400,USER_NOT_FOUND);

        const hashedPassword = await hashPassword(password);
        await db.user.update(
            {
                ...newProfile,
                password:hashedPassword
            },
            {
                where:{
                    userId
                }
            }
        );
}

module.exports = udpateUserProfile;