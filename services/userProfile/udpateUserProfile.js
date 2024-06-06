
const db = require("../../models/index");
const { USER_NOT_FOUND } = require("../../utils/error.message");

const udpateUserProfile = async(userId,newProfile)=> {
    const user = await db.user.findOne({where:{userId}});
        if(!user){
            throw new Error(USER_NOT_FOUND)
        }

        await db.user.update(
            {
                ...newProfile,
            },
            {
                where:{
                    userId
                }
            }
        );
}

module.exports = udpateUserProfile;