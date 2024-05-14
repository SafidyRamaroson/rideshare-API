const db = require("../../models/user.model");
const { USER_NOT_FOUND,REQUIRED_CONFIRMATION_DELETE_ACCOUNT } = require("../../utils/error.message");
const httpException = require("../../utils/httpException");


const deleteUser = async(userId,confirmed)=>{
    if(!confirmed){
        throw new httpException(400,REQUIRED_CONFIRMATION_DELETE_ACCOUNT);
    }

    const deletedUser = await db.user.destroy({
        where : {
            userId
        }
    });

    if(!deletedUser){
        throw new httpException(404,USER_NOT_FOUND);
    }
}

module.exports = deleteUser;