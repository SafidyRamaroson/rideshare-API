const { USER_NOT_FOUND } = require("../../utils/error.message");
const httpException = require("../../utils/httpException").default;
const db  = require("./../../models/index");


const getUserProfilByUserId = async(userId)=> {
    const user = await db.user.findOne({
        where:{
            userId
        }
    });

    if(!user){
        throw new httpException(404,USER_NOT_FOUND);
    }

    return user;
};

module.exports = getUserProfilByUserId;

